import mongoose from "mongoose";

const { Schema, SchemaTypes, model } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

export default Contact;
