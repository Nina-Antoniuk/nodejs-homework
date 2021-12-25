import Contact from "../../model";

const getContactById = async (contactId) => {
  console.log("here is getContactsById func from models");
  const result = await Contact.findById(contactId);
  return result;
};

export default getContactById;
