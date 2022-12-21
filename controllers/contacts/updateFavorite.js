const {
  Contact,
  schemas: { updateFavoriteSchema },
} = require('../../models/contact');
const { RequestError } = require('../../helpers');

const updateFavorite = async (req, res) => {
  const { error } = updateFavoriteSchema.validate(req.body);

  if (error) {
    throw RequestError(400, 'missing field favorite');
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw RequestError(404, 'Contact not found');
  }

  res.json(result);
};

module.exports = updateFavorite;
