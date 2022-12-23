const {
  Contact,
  schemas: { addSchema, updateFavoriteSchema },
} = require('../models/contact');
const { RequestError, ctrlWrapper } = require('../helpers');

const getAll = async (req, res) => {
  const result = await Contact.find({}, '-createdAt -updatedAt');
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw RequestError(404, 'Contact not found');
  }
  res.json(result);
};

const add = async (req, res) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    throw RequestError(400, error.message);
  }

  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw RequestError(404, 'Contact not found');
  }
  res.json({ message: 'contact deleted' });
};

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

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  getById: ctrlWrapper(getById),
  remove: ctrlWrapper(remove),
  update: ctrlWrapper(update),
  updateFavorite: ctrlWrapper(updateFavorite),
};
