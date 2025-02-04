import Joi from "joi";

const userLoginValidationSchema = Joi.object({
  username: Joi.required(),
  password: Joi.required(),
});

export default userLoginValidationSchema;
