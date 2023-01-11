const { Contact } = require('../models/Contact');
const { RequestError, ctrlWrapper } = require('../helpers');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * 10;
  const result = await Contact.find({ owner }, '-createdAt -updatedAt -owner', {
    skip,
    limit,
  });

  switch (favorite) {
    case 'true': {
      const favoriteResult = result.filter((contact) => contact.favorite);
      res.json(favoriteResult);
      break;
    }
    case 'false': {
      const unfavoriteResult = result.filter((contact) => !contact.favorite);
      res.json(unfavoriteResult);
      break;
    }
    default:
      res.json(result);
  }
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId, '-owner');
  if (!result) {
    throw RequestError(404, 'Contact not found');
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
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
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

  if (!result) {
    throw RequestError(404, 'Contact not found');
  }

  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

  if (!result) {
    throw RequestError(404, 'Contact not found');
  }

  // {new: true} - update result straightaway

  res.json(result);

  // if {new: true} was not must wtite like this
  // res.json({
  //   id: contactId,
  //   ...req.body,
  // });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  getById: ctrlWrapper(getById),
  remove: ctrlWrapper(remove),
  update: ctrlWrapper(update),
  updateFavorite: ctrlWrapper(updateFavorite),
};
