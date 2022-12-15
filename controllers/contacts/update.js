const contacts = require('../../models/contacts');
const { RequestError, contactSchema } = require('../../helpers');

const update = async (req, res) => {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    throw RequestError(400, error.message);
  }

  const { contactId } = req.params;
  const result = await contacts.updateContactById(contactId, req.body);

  if (!result) {
    throw RequestError(404, 'Contact not found');
  }

  res.json(result);
};

module.exports = update;
