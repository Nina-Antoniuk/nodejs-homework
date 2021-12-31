import { HttpCode } from "../../lib/consts";
import { removeContact } from "../../repository/contacts";

export default async (req, res, next) => {
  const { contactId } = req.params;
  const contactsList = await removeContact(contactId);
  if (contactsList) {
    return res.status(HttpCode.OK).json({ message: "contact deleted" });
  }
  return res.status(HttpCode.NOT_FOUND).json({ message: "Not found" });
};
