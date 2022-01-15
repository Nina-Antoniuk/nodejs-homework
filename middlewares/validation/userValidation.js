import Joi from "joi";
import { HttpCode } from "../../lib/consts";

const userSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  avatar: Joi.func(),
});

const userValidation = async (req, res, next) => {
  try {
    await userSchema.validateAsync(req.body);
  } catch (err) {
    res.status(400).json({
      Status: `${HttpCode.BAD_REQUEST} Bad Request`,
      "Content-Type": "application/json",
      ResponseBody: err.message,
    });
    return;
  }
  next();
};

export default userValidation;
