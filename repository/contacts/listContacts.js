import Contact from "../../model";

const listContacts = async () => {
  console.log("here is listContacts func from models");
  const result = await Contact.find();
  return result;
};

export default listContacts;
