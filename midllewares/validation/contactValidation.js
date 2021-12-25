import Joi from "joi";

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(15).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(15).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
}).or("name", "email", "phone");

const validationOfCreation = async (req, res, next) => {
  try {
    await addContactSchema.validateAsync(req.body);
  } catch (err) {
    res.status(400).json({ message: "missing required name field" });
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

export default { validationOfCreation, updateValidation };
