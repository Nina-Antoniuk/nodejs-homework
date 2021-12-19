const { listContacts } = require("../../models/contacts/index");

module.exports = async (req, res, next) => {
  const data = await listContacts();
  res.status(200).json(data);
};
