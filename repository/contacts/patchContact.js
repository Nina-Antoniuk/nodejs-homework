import Contact from "../../model";

const patchContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { ...body },
    { new: true }
  );
  return result;
};

export default patchContact;
