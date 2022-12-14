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

const getContactById = async (id) => {
  const contacts = await listContacts();
  const contactId = String(id);
  const desiredContact = contacts.find((el) => el.id === contactId);

  return desiredContact || null;
};

const removeContactById = async (id) => {
  const contacts = await listContacts();
  const contactId = String(id);
  const indexToRemove = contacts.findIndex((el) => el.id === contactId);

  if (indexToRemove === -1) {
    return null;
  }

  const [contactToRemove] = contacts.splice(indexToRemove, 1);

  updateContacts(contacts);

  return contactToRemove;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();

  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  updateContacts(contacts);

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
};
