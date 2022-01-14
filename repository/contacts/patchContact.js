import { Contact } from "../../model";

const patchContact = async (contactId, body, userId) => {
  const result = await Contact.findByIdAndUpdate(
    {
      _id: contactId,
      owner: userId,
    },
    { ...body },
    { new: true }
  ).populate({
    path: "owner",
    select: "name email",
  });
  return result;
};

export default patchContact;
