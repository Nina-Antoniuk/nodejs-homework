const fs = require("fs/promises");
const contactsPath = require("./contactsPath");
const contacts = require("../../db/contacts.json");

const removeContact = async (contactId) => {
  const contact = contacts.find((el) => el.id === contactId);
  if (contact) {
    const result = contacts.filter((el) => el.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
    return result;
  }
  return null;
};

module.exports = removeContact;
