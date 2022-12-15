const contacts = require('../../models/contacts');
const { RequestError } = require('../../helpers');

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContactById(contactId);
  if (!result) {
    throw RequestError(404, 'Contact not found');
  }
  res.json({ message: 'contact deleted' });
};

module.exports = remove;
