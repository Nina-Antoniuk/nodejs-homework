import Contact from "../../model";

const addContact = async ({ name, email, phone }) => {
  console.log("here is addContact function from models file");
  const result = await Contact.create({ name, email, phone });
  return result;
};

export default addContact;
