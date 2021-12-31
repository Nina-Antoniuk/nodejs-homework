import { HttpCode } from "../../lib/consts";
import { getContactById } from "../../repository/contacts";

export default async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    return res.status(HttpCode.OK).json(contact);
  }
  return res.status(HttpCode.NOT_FOUND).json({ message: "not found" });
};
