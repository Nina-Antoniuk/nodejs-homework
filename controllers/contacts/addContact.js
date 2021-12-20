const { addContact } = require("../../models/contacts/index");

module.exports = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = await addContact({ name, email, phone });
  res.status(201).json(newContact);
};
