import express from "express";
import ContactsControllers from "../../../controllers/contacts";
import validation from "../../../middlewares/validation/contactValidation";
import guard from "../../../middlewares/guard";

const router = express.Router();
const contactsControllers = new ContactsControllers();

router.get("/", guard, contactsControllers.getContacts);

router.get("/:contactId", guard, contactsControllers.getContactById);

router.post(
  "/",
  [guard, validation.validationOfCreation],
  contactsControllers.addContact
);

router.delete("/:contactId", guard, contactsControllers.removeContact);

router.put(
  "/:contactId",
  [guard, validation.updateValidation],
  contactsControllers.updateContact
);

router.patch(
  "/:contactId",
  [guard, validation.updateFavoriteValidation],
  contactsControllers.updateStatusContact
);

export default router;
