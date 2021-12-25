import { HttpCode } from "../../lib/consts";
import { addContact } from "../../repository/contacts";

export default async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(HttpCode.CREATED).json(newContact);
};
