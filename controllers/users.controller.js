const { User } = require('../models/User');
const { RequestError, ctrlWrapper } = require('../helpers');

const signup = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, 'Email has already exist');
  }

  const newUser = await User.create({ password, email });
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const signin = async (req, res) => {};

const signout = async (req, res) => {};

const current = async (req, res) => {};

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
  current: ctrlWrapper(current),
};
