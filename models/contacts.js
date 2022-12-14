const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const desiredContact = contacts.find((el) => el.id === contactId);

  return desiredContact || null;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await updateContacts(contacts);

  return newContact;
};

const removeContactById = async (contactId) => {
  const contacts = await listContacts();
  const indexToRemove = contacts.findIndex((el) => el.id === contactId);

  if (indexToRemove === -1) {
    return null;
  }

  const [contactToRemove] = contacts.splice(indexToRemove, 1);
  await updateContacts(contacts);

  return contactToRemove;
};

const updateContactById = async (contactId, newContact) => {
  const contacts = await listContacts();
  const indexToUpdate = contacts.findIndex((el) => el.id === contactId);

  if (indexToUpdate === -1) {
    return null;
  }

  contacts[indexToUpdate] = { contactId, ...newContact };
  await updateContacts(contacts)

  return contacts[indexToUpdate];
};

module.exports = {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
};
