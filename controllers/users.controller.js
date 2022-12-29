const { User } = require('../models/User');
const { RequestError, ctrlWrapper } = require('../helpers');

const signup = async (req, res) => {};

const signin = async (req, res) => {};

const signout = async (req, res) => {};

const current = async (req, res) => {};

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
  current: ctrlWrapper(current),
};
