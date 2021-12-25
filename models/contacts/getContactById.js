import { ObjectId } from "mongodb";
import dbConnect from "../db";

const getContactById = async (contactId) => {
  console.log("here is getContactsById func from models");
  const client = await dbConnect;
  const collection = await client.db().collection("contacts");
  const id = ObjectId(contactId);
  const [result] = await collection.find({ _id: id }).toArray();
  return result;
};

export default getContactById;
