const { Schema, model } = require('mongoose');
const { serverErrorHandler } = require('../helpers');
const Joi = require('joi');

const userShema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userShema.post('save', serverErrorHandler);

const User = model('user', userShema);

module.exports = {
  User,
};
