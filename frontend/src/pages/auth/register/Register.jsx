import React from "react";
import axios from "axios";
import { useFormik } from "formik";
// import { registerschema } from "../../../schema/Registerschema";
import "./Register.scss";
import { ToastContainer, toast } from "react-toastify";

import girl from "../../../assets/images/girl.png";
import { userRegisterValidationSchema } from "../../../schema/Registerschema";
// import CheckMail from "../../../components/checkMail/CheckMail";

const Register = () => {
  const baseUrl = "http://localhost:5000/auth";

  const submitForm = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("lastname", values.lastname);
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("birthDate",values.birthDate)
      


      await axios.post(`${baseUrl}/register`, formData);

      actions.resetForm();

      toast.success(" Please check your email to verify your account.");
    } catch (error) {
      toast.error("Registration failed:", error);
    }
  };
  

  const { values, handleChange, handleSubmit, setFieldValue, errors } =
    useFormik({
      initialValues: {
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        birthDate: "",

      },
      onSubmit: submitForm,
      validationSchema: userRegisterValidationSchema,
    });

  return (
    <div className="register-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="image-section">
        <img src={girl} alt="Reading Girl" className="register-image" />
      </div>




      <div className="register-card">

        <h2 className="title">
          Join <span className="logo">Read<span className="highlight">ly</span></span> - Unlock a World of Books!
        </h2>
        <div className="social-buttons">
          <button className="google-signin">
            {/* <img src="" alt="" /> */}
            Login with Google</button>
          <button className="google-signin">Login with Google</button>
        </div>

        <form className='register-form'
          encType="multipart/form-data"
          action=""

          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >

          <div className="form-group">

            <input
              placeholder="add your firstName" className="input-field"
              type="text"
              id="name"
              name="name"

              onChange={handleChange}
              value={values.name}
            />
            {errors.name && (
              <div className="error">
                <span className="error-icon">❌</span> {errors.name}
              </div>
            )}
          </div>
          <div className="form-group">

            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="add your  last name" className="input-field"
              onChange={handleChange}
              value={values.lastname}
            />
            {errors.lastname && (
              <div className="error">
                <span className="error-icon">❌</span> {errors.lastname}
              </div>
            )}
            {/* <div className="error">{errors.lastname}</div> */}
          </div>

          <div className="form-group">

            <input
              type="text"
              id="username"
              name="username"
              placeholder="add user name" className="input-field"
              onChange={handleChange}
              value={values.username}
            />
            {errors.username && (
              <div className="error">
                <span className="error-icon">❌</span> {errors.username}
              </div>
            )}
          </div>

          <div className="form-group">

            <input
              type="email"
              id="email"
              name="email"

              placeholder="add email" className="input-field"
              onChange={handleChange}
              value={values.email}
            />
            {errors.email && (
              <div className="error">
                <span className="error-icon">❌</span> {errors.email}
              </div>
            )}
          </div>
          <div className="form-group">
            <input
              type="date" // Tarix üçün input tipi
              id="birthDate"
              name="birthDate"
              placeholder="Add birth date"
              className="input-field"
              onChange={handleChange}
              value={values.birthDate}
            />
            {errors.birthDate && (
              <div className="error">
                <span className="error-icon">❌</span> {errors.birthDate}
              </div>
            )}
          </div>


          <div className="form-group">

            <input
              type="password"
              id="password"
              name="password"
              placeholder="add password" className="input-field"

              onChange={handleChange}
              value={values.password}
            />
            {errors.password && (
              <div className="error">
                <span className="error-icon">❌</span> {errors.password}
              </div>
            )}
          </div>


          <span>
            Already have an account? <a style={{ color: "#00DC64" }} href="/login" >Login</a>
          </span>

          <button type="submit" className="signup-button mt-1">
            Sign-Up
          </button>


        </form>
      </div>
    </div>
  );
};

export default Register;
