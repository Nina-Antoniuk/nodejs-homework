const { randomUUID } = require("crypto");
const fs = require("fs/promises");
const path = require("path");
const contacts = require("./contacts.json");

const contactsPath = path.resolve(__dirname, "./contacts.json");

const listContacts = async () => {
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = contacts.find((el) => el.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contact = contacts.find((el) => el.id === contactId);
  if (contact) {
    const result = contacts.filter((el) => el.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
    return result;
  }
  return null;
};

const addContact = async ({ name, email, phone }) => {
  // if(){} "message": res.status(400).json({"message": "missing required name field"})
  const newContact = { name, email, phone, id: randomUUID() };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const index = contacts.findIndex((el) => el.id === contactId);
  if (index !== -1) {
    const updatedContact = { ...contacts[index], ...body };
    contacts[index] = updatedContact;
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updatedContact;
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
