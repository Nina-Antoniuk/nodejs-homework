import { Contact } from "../../model";

const removeContact = async (contactId, userId) => {
  const result = Contact.findOneAndRemove({ _id: contactId, owner: userId });
  return result;
};

export default removeContact;
