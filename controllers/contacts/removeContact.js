import { removeContact } from "../../models/contacts/index";

export default async (req, res, next) => {
  const { contactId } = req.params;
  const contactsList = await removeContact(contactId);
  if (contactsList) {
    return res.status(200).json({ message: "contact deleted" });
  }
  return res.status(404).json({ message: "Not found" });
};
