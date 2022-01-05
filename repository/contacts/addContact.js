import { Contact } from "../../model";

const addContact = async (body, userId) => {
  const result = await Contact.create({ ...body, owner: userId });
  return result;
};

export default addContact;
