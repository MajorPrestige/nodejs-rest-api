const fs = require('fs/promises');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const Jimp = require('jimp');
const { v4: uuid } = require('uuid');

const { User } = require('../models/User');
const { RequestError, ctrlWrapper, sendMail } = require('../helpers');
const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, 'Email has already exist');
  }

  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 7);
  const verificationToken = uuid();

  const newUser = await User.create({
    password: hashPassword,
    email,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: 'Email verification',
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}" target="_blank">Verify email</a>`,
  };

  sendMail(mail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      verificationToken: newUser.verificationToken,
    },
  });
};

const verify = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw RequestError(404, 'User not found');
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: '' });

  res.json({
    message: 'Email verify success',
  });
};

const resendEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(404);
  }

  if (user.verify) {
    throw RequestError(400, 'Email already verify');
  }

  const mail = {
    to: email,
    subject: 'Email verification',
    html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}" target="_blank">Verify email</a>`,
  };

  sendMail(mail);

  res.json({
    message: 'Email resend sucess',
  });
};

const signin = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(401, 'invalid email');
  }

  if (!user.verify) {
    throw RequestError(401, 'Email not verified ');
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
  if (!req.file) {
    throw RequestError(400, 'Avatar not found');
  }

  const { path: tempUpload, originalname } = req.file;
  const { _id, email } = req.user;

  // if filename will duplicate - rewrite file. So we create a uniqe name
  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(__dirname, '../public', 'avatars', filename);
  await fs.rename(tempUpload, resultUpload);

  const resizeFile = await Jimp.read(resultUpload);
  await resizeFile.resize(250, 250).write(resultUpload);

  const avatarURL = path.join('avatars', filename);
  const result = await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    email,
    avatarURL: result.avatarURL,
  });
};

module.exports = {
  signup: ctrlWrapper(signup),
  verify: ctrlWrapper(verify),
  resendEmail: ctrlWrapper(resendEmail),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
  current: ctrlWrapper(current),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
