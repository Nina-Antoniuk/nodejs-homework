import { listContacts } from "../../models/contacts/index";

export default async (req, res, next) => {
  const data = await listContacts();
  res.status(200).json(data);
};
