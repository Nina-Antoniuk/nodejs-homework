const model = require("../../model/index");
const express = require("express");
const router = express.Router();
const { validationOfCreation, updateValidation } = require("./validation");

router.get("/", async (req, res, next) => {
  const data = await model.listContacts();
  res.status(200).json(data);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await model.getContactById(contactId);
  if (contact) {
    return res.status(200).json(contact);
  }
  return res.status(404).json({ message: "not found" });
});

router.post("/", validationOfCreation, async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = await model.addContact({ name, email, phone });
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactsList = await model.removeContact(contactId);
  if (contactsList) {
    return res.status(200).json({ message: "contact deleted" });
  }
  return res.status(404).json({ message: "Not found" });
});

router.put("/:contactId", updateValidation, async (req, res, next) => {
  const contact = await model.updateContact(req.params.contactId, req.body);
  if (contact) {
    return res.status(200).json(contact);
  }
  return res.status(404).json({ message: "Not found" });
});

module.exports = router;
