import React from "react";
import axios from "axios";
import { useFormik } from "formik";
// import { registerschema } from "../../../schema/Registerschema";
import "./Register.scss";
import girl from "../../../assets/images/girl.png";
// import CheckMail from "../../../components/checkMail/CheckMail";

const Register = () => {
  const baseUrl = "http://localhost:5000/auth";

  const submitForm = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);

      await axios.post(`${baseUrl}/register`, formData);

      actions.resetForm();

      alert(" Please check your email to verify your account.");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const { values, handleChange, handleSubmit, setFieldValue, errors } =
    useFormik({
      initialValues: {
        name: "",
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
      },
      onSubmit: submitForm,
      validationSchema:registerschema,
    });

  return (
    <div className="register-container">
      
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

      <form  className='register-form'
        encType="multipart/form-data"
        action=""
       
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        
        <div className="form-group">
          <div className="text-danger">{errors.name}</div>
          <input
          placeholder="add name" className="input-field"
            type="text"
            id="name"
            name="name"
            
            onChange={handleChange}
            value={values.name}
          />
        </div>

        <div className="form-group">
          <div className="text-danger">{errors.username}</div>
          <input
            type="text"
            id="username"
            name="username"
           placeholder="User Name" className="input-field"
            onChange={handleChange}
            value={values.username}
          />
        </div>

        <div className="form-group">
          <div className="text-danger">{errors.email}</div>
          <input
            type="email"
            id="email"
            name="email"
          
            placeholder="add email" className="input-field"
            onChange={handleChange}
            value={values.email}
          />
        </div>

        <div className="form-group">
          <div className="text-danger">{errors.password}</div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="add password" className="input-field"
         
            onChange={handleChange}
            value={values.password}
          />
        </div>

        <div className="form-group">
          <div className="text-danger">{errors.confirmpassword}</div>
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
           placeholder="confirm password" className="input-field"
            onChange={handleChange}
            value={values.confirmpassword}
          />
        </div>
        <span>
          Already have an account? <a style={{color:"#00DC64"}}href="/login" >Login</a>
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
