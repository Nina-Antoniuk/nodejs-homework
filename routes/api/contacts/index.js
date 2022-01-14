import express from "express";
import {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
} from "../../../controllers/contacts";
import validation from "../../../middlewares/validation/contactValidation";
import guard from "../../../middlewares/guard";

const router = express.Router();

router.get("/", guard, getContacts);

router.get("/:contactId", guard, getContactById);

router.post("/", [guard, validation.validationOfCreation], addContact);

router.delete("/:contactId", guard, removeContact);

router.put("/:contactId", [guard, validation.updateValidation], updateContact);

router.patch(
  "/:contactId",
  [guard, validation.updateFavoriteValidation],
  updateStatusContact
);

export default router;
