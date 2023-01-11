const fs = require('fs/promises');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const Jimp = require("jimp")

const { User } = require('../models/User');
const { RequestError, ctrlWrapper } = require('../helpers');
const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, 'Email has already exist');
  }

  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 7);
  const newUser = await User.create({ password: hashPassword, email, avatarURL });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const signin = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(400, 'QWE');
  }

  const passwordCompares = await bcrypt.compare(password, user.password);

  if (!passwordCompares) {
    throw RequestError(401, 'invalid password');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7 days' });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204);
};

const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const updateSubscription = async (req, res) => {
  const { _id, email } = req.user;
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(_id, { subscription }, { new: true });

  res.json({
    email,
    subscription: result.subscription,
  });
};

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id, email } = req.user;

  // if filename will duplicate - rewrite file. So we create a uniqe name
  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(__dirname, '../public', 'avatars', filename);
  await fs.rename(tempUpload, resultUpload);

  const resizeFile = await Jimp.read(resultUpload);
  await resizeFile.resize(250, 250).write(resultUpload);
  
  const avatarURL = path.join('avatars', filename);
  const result = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

  res.json({
    email,
    avatarURL: result.avatarURL,
  });
};

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
  current: ctrlWrapper(current),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
