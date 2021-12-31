import Contact from "../../model";

const removeContact = async (contactId) => {
  console.log("here is removeContacts func from models");
  const result = Contact.findByIdAndRemove(contactId);
  return result;
};

export default removeContact;
