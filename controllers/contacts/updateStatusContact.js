import { HttpCode } from "../../lib/consts";
import { patchContact } from "../../repository/contacts";

export default async (req, res, next) => {
  const { id: userId } = req.user;
  const contact = await patchContact(req.params.contactId, req.body, userId);
  if (contact) {
    return res.status(HttpCode.OK).json(contact);
  }
  return res.status(HttpCode.NOT_FOUND).json({ message: "Not found" });
};
