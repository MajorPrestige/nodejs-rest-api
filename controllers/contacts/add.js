// const contacts = require('../../models/contacts');
const Contact = require('../../models/contact');
const { RequestError, contactSchema } = require('../../helpers');

const add = async (req, res) => {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    throw RequestError(400, error.message);
  }

  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = add;
