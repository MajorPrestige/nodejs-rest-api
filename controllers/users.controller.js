const bcrypt = require('bcryptjs');

const { User } = require('../models/User');
const { RequestError, ctrlWrapper } = require('../helpers');

const signup = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, 'Email has already exist');
  }

  const hashPassword = await bcrypt.hash(password, 7);
  const newUser = await User.create({ password: hashPassword, email });

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
    throw RequestError(401, 'invalid email');
  }

  const passwordCompares = await bcrypt.compare(password, user.password);

  if (!passwordCompares) {
    throw RequestError(401, 'invalid password');
  }

  res.status(201).json({
    token: "exampletoken",
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const signout = async (req, res) => {};

const current = async (req, res) => {};

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
  current: ctrlWrapper(current),
};
