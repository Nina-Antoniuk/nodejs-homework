import dbConnect from "../db";

const listContacts = async () => {
  console.log("here is listContacts func from models");
  const client = await dbConnect;
  const collection = await client.db().collection("contacts");
  const result = await collection.find().toArray();
  return result;
};

export default listContacts;
