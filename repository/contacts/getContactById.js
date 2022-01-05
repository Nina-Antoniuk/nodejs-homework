import { Contact } from "../../model";

const getContactById = async (contactId, userId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: "owner",
    select: "name email",
  });
  return result;
};

export default getContactById;
