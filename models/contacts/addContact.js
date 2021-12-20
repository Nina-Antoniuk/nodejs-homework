const { randomUUID } = require("crypto");
const fs = require("fs/promises");
const contactsPath = require("./contactsPath");
const contacts = require("../../db/contacts.json");

const addContact = async ({ name, email, phone }) => {
  const newContact = { name, email, phone, id: randomUUID() };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = addContact;
