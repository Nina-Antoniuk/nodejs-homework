const express = require("express");
const router = express.Router();
const {
  getContactsList,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contacts/index");
const {
  validationOfCreation,
  updateValidation,
} = require("../../midllewares/validation/contactValidation");

router.get("/", getContactsList);

router.get("/:contactId", getContactById);

router.post("/", validationOfCreation, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateValidation, updateContact);

module.exports = router;
