import Joi from "joi";

const userRegisterValidationSchema = Joi.object({
   image: Joi.string(),
  name: Joi.string().min(3).max(30).required(),
  lastname: Joi.string().min(3).max(30).required(),
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
  .min(8)
  .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
  .required()
  .messages({
    "string.min": "Password must be at least 8 characters long.",
    "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
  }),


  // image: Joi.string().uri().required(),
  // name: Joi.string().min(3).max(30).required(),
  // username: Joi.string().alphanum().min(3).max(30).required(),
  // email: Joi.string().email().required(),
 
  // confirmPassword: Joi.string()
  //   .valid(Joi.ref("password"))
  //   .required()
  //   .messages({
  //     "any.only": "Passwords must match.",
  //   }),


















  // image: Joi.string()
  //   .uri()
  //   .required()
  //   .messages({
  //     "string.base": "Image URL must be a string.",
  //     "string.uri": "Image must be a valid URL.",
  //     "any.required": "Image is required.",
  //   }),
  // name: Joi.string()
  //   .min(3)
  //   .max(30)
  //   .pattern(/^[A-Za-z\s]+$/)
  //   .required()
  //   .messages({
  //     "string.base": "Name must be a string.",
  //     "string.min": "Name must be at least 3 characters.",
  //     "string.max": "Name must be at most 30 characters.",
  //     "string.pattern.base": "Name must only contain letters and spaces.",
  //     "any.required": "Name is required.",
  //   }),
  // username: Joi.string()
  //   .alphanum()
  //   .min(3)
  //   .max(30)
  //   .required()
  //   .messages({
  //     "string.base": "Username must be a string.",
  //     "string.alphanum": "Username must only contain letters and numbers.",
  //     "string.min": "Username must be at least 3 characters.",
  //     "string.max": "Username must be at most 30 characters.",
  //     "any.required": "Username is required.",
  //   }),
  // email: Joi.string()
  //   .email()
  //   .required()
  //   .messages({
  //     "string.base": "Email must be a string.",
  //     "string.email": "Please provide a valid email address.",
  //     "any.required": "Email is required.",
  //   }),
  // password: Joi.string()
  //   .min(8)
  //   .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
  //   .required()
  //   .messages({
  //     "string.base": "Password must be a string.",
  //     "string.min": "Password must be at least 8 characters.",
  //     "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, and one digit.",
  //     "any.required": "Password is required.",
  //   }),
});

export default userRegisterValidationSchema;
