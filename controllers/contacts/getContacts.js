import { HttpCode } from "../../lib/consts";
import { listContacts } from "../../repository/contacts";

export default async (req, res, next) => {
  const data = await listContacts();
  res.status(HttpCode.OK).json(data);
};
