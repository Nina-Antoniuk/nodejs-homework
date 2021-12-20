const fs = require("fs/promises");
const contactsPath = require("./contactsPath");
const contacts = require("../../db/contacts.json");

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

module.exports = updateContact;
