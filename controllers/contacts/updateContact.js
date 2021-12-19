const { updateContact } = require("../../models/contacts/index");

module.exports = async (req, res, next) => {
  const contact = await updateContact(req.params.contactId, req.body);
  if (contact) {
    return res.status(200).json(contact);
  }
  return res.status(404).json({ message: "Not found" });
};
