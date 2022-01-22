import jwt from "jsonwebtoken";
import Users from "../../repository/users";

const SECRET_KEY = process.env.SECRET_KEY;

class AuthService {
  async createUser(body) {
    const { id, email } = await Users.create(body);
    // console.log("users in repo", Users); //methods in  repo/users
    return { id, email };
  }

  async getToken(user) {
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "20h" });
    return token;
  }

  async getUserByToken(token) {
    const user = await Users.findByToken(token);
    return user;
  }

  async getUser(email, password) {
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);
    if (!isValidPassword) return null;
    return user;
  }

  async isUserExist(email) {
    const user = await Users.findByEmail(email);
    return !!user;
  }

  async setToken(id, token) {
    await Users.updateToken(id, token);
  }
}

export default AuthService;
