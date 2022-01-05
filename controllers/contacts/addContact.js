import { HttpCode } from "../../lib/consts";
import { addContact } from "../../repository/contacts";

export default async (req, res, next) => {
  const { id } = req.user;
  const newContact = await addContact(req.body, id);
  res.status(HttpCode.CREATED).json(newContact);
};
