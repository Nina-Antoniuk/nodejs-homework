import mongoose from "mongoose";

const { connect, connection } = mongoose;

const uri = process.env.MONGO_DB;

const db = connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on("connected", () => {
  console.log("connected to db");
});

connection.on("error", () => {
  console.log(`connection error`);
});

connection.on("disconnected", () => {
  console.log("disconnected connection");
});

process.on("SIGINT", async () => {
  const client = await db;
  client.close();
  console.log("Connection DB closed");
  process.exit(1);
});

export default db;
