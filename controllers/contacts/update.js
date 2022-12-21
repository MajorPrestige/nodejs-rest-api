const {
  Contact,
  schemas: { addSchema },
} = require('../../models/contact');
const { RequestError } = require('../../helpers');

const update = async (req, res) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    throw RequestError(400, error.message);
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

  if (!result) {
    throw RequestError(404, 'Contact not found');
  }

  res.json(result);
};

module.exports = update;
