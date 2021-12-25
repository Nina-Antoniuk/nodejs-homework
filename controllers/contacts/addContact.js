import { addContact } from "../../models/contacts/index";

export default async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = await addContact({ name, email, phone });
  res.status(201).json(newContact);
};
