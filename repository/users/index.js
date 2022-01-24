import { User } from "../../model";

const findById = async (id) => {
  return await User.findById(id);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findByToken = async (token) => {
  return await User.findOne({ token });
};

const create = async (body) => {
  const user = new User(body);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const findByVerifyToken = async (verificationToken) => {
  return await User.findOne({ verificationToken });
};

const updateVerify = async (id, status) => {
  return await User.updateOne(
    { _id: id },
    { verify: status, verificationToken: null }
  );
};

export default {
  findById,
  findByEmail,
  findByToken,
  create,
  updateToken,
  findByVerifyToken,
  updateVerify,
};
