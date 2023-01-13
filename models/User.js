const { Schema, model } = require('mongoose');
const { serverErrorHandler } = require('../helpers');
const Joi = require('joi');

const subscription = ['starter', 'pro', 'business'];

const userShema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscription,
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

const userSignupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid(...subscription),
  verificationToken: Joi.string(),
});

const userSigninSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const userEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const userUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscription)
    .required(),
});

userShema.post('save', serverErrorHandler);

const shemas = {
  userSignupSchema,
  userSigninSchema,
  userUpdateSubscriptionSchema,
  userEmailSchema,
};

const User = model('user', userShema);

module.exports = {
  User,
  shemas,
};
