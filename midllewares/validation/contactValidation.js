import Joi from "joi";

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(15).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool().optional(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(15).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.bool().optional(),
}).or("name", "email", "phone");

const updateFavoritSchema = Joi.object({
  favorite: Joi.bool().optional().required(),
});

const validationOfCreation = async (req, res, next) => {
  try {
    await addContactSchema.validateAsync(req.body);
  } catch (err) {
    res
      .status(400)
      .json({ message: `${err.message}, missing required name field` });
    return;
  }
  next();
};

const updateValidation = async (req, res, next) => {
  try {
    await updateContactSchema.validateAsync(req.body);
  } catch (err) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }
  next();
};

const updateFavoritValidation = async (req, res, next) => {
  try {
    await updateFavoritSchema.validateAsync(req.body);
  } catch (err) {
    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: "missing field favorite" });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  }
  next();
};

export default {
  validationOfCreation,
  updateValidation,
  updateFavoritValidation,
};
