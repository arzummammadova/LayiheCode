import * as Yup from "yup";

export const editSchema = Yup.object({
  // image: Yup.mixed(), 
  
  bio:Yup.string().max(50),
  name: Yup.string()
    .min(3, "Name must be at least 3 characters.")
    .max(30, "Name must be at most 30 characters.")
    .required("Name is required."),
  lastname: Yup.string()
    .min(3, "Lastname must be at least 3 characters.")
    .max(30, "Lastname must be at most 30 characters.")
    .required("Lastname is required."),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters.")
    .max(30, "Username must be at most 30 characters.")
    .required("Username is required."),
  email: Yup.string()
    .email("Invalid email format.")
    .required("Email is required."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    )
    .required("Password is required."),
    birthDate: Yup.date()
  .max(new Date(), "Birth date cannot be in the future.") // Gələcək tarixlərin qarşısı alınır
  .required("Birth date is required."), // Məcburi sahə kimi qeyd edilir

});
