import { Contact } from "../../model";

const updateContact = async (contactId, body, userId) => {
  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: userId,
    },
    { ...body },
    { new: true }
  );
  return result;
};

export default updateContact;
