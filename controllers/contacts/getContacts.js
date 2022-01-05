import { HttpCode } from "../../lib/consts";
import { listContacts } from "../../repository/contacts";

export default async (req, res, next) => {
  const { id } = req.user;
  const data = await listContacts(id);
  res.status(HttpCode.OK).json(data);
};
