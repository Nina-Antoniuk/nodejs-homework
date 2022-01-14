import jwt from "jsonwebtoken";
import { HttpCode } from "../../lib/consts";
import Users from "../../repository/users";

const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, SECRET_KEY);
    return !!verify;
  } catch (error) {
    return false;
  }
};

const guard = async (req, res, next) => {
  const token = req.get("authorization")?.split(" ")[1];
  const isValidToken = verifyToken(token);
  if (!isValidToken) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      Status: `${HttpCode.UNAUTHORIZED} Unauthorized`,
      "Content-Type": "application/json",
      ResponseBody: {
        message: "Not authorized",
      },
    });
  }
  const payload = jwt.decode(token);
  const user = await Users.findById(payload.id);
  if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      Status: `${HttpCode.UNAUTHORIZED} Unauthorized`,
      "Content-Type": "application/json",
      ResponseBody: {
        message: "Not authorized",
      },
    });
  }
  req.user = user;
  next();
};

export default guard;
