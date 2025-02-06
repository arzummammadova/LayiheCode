import React from "react";
import { useFormik } from "formik";

import axios from "axios";
import { forgotschema } from "../../../schema/ForgotSchema";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const baseUrl = `http://localhost:5000/auth`;

  const submitForm = async (values, actions) => {
    try {
      const res = await axios.post(`${baseUrl}/forgotpassword`, values);
      if (res.status === 200) {
        toast.success("Check your email to reset your password");
      } else {
        toast.error("Something went wrong, try again later");
      }

      actions.resetForm();
    } catch (error) {
      console.error("Forgot password failed:", error);
    }
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      email: "",
    },

    onSubmit: submitForm,
    validationSchema:forgotschema,
  });

  return (
    <div className="register-container">
       <ToastContainer position="top-right" autoClose={3000} />
       
       <div className="register-card">
          <form
        action=""
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
     
     <h2 className="title">
          Forgot Password? <span className="logo">Read<span className="highlight">ly</span></span>Write your email
        </h2>
        <div className="form-group">
          {/* <label htmlFor="username">Email</label> */}
          
          <input
            placeholder="Enter your email"
            type="text"
            id="email"
            name="email"
            className="input-field"
            onChange={handleChange}
            value={values.email}
          />
              
        {errors.email && (
              <div className="error">
                <span className="error-icon">❌</span> {errors.email}
              </div>
            )}
        </div>
        <button type="submit " style={{width:"100%"}} className="signup-button mt-5 ">
          Send
        </button>
      </form>
       </div>
    
    </div>
  );
};

export default ForgotPassword;
