import * as Yup from "yup";

export const userLoginValidationSchema = Yup.object({
  
    username: Yup
    .string()
    .required("Username is required")
    .lowercase("Username must be lowercase"),
  password: Yup.string().required("Password is required"),


})