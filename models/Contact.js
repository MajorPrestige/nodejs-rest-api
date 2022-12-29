const { Schema, model } = require('mongoose');
const { serverErrorHandler } = require('../helpers');
const Joi = require('joi');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
); // check on back-end request body

contactSchema.post('save', serverErrorHandler); // check for any validate errors and update error status (default err.status 500)

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
}); // check front-end request body

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};


const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
};
