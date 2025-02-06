import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLoginValidationSchema } from "../../../schema/Loginschema";
import { setUser } from "../../../redux/features/userSlice";
import { ToastContainer, toast } from "react-toastify";
import girl from "../../../assets/images/girl.png";
import "./Login.scss";
const Login = () => {
  const baseUrl = "http://localhost:5000/auth";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm = async (values, actions) => {
    try {
      const res = await axios.post(`${baseUrl}/login`, values);

      if (res.status === 200) {
        dispatch(setUser(res.data));
        toast.success("Login successful");
      } else {
      toast.error("Password or username is incorrect");
      }

      actions.resetForm();

      navigate("/");
    } catch (error) {
    toast.error("Password or username is incorrect ", error);

    }
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: submitForm,
    validationSchema:userLoginValidationSchema,
  });

  return (

    <div className="register-container">
    <ToastContainer position="top-right" autoClose={3000} />

  
    
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
      <form 
        encType="multipart/form-data"
        action=""
       className='register-form'
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
      
        <div className="form-group">
        
        {errors.username && (
              <div className="error">
                <span className="error-icon">❌</span> {errors.username}
              </div>
            )}
          <input
            type="text"
            id="username"
            name="username"
            placeholder="add username" className="input-field"

            onChange={handleChange}
            value={values.username}
          />
        </div>

        <div className="form-group">
        
        {errors.password && (
              <div className="error">
                <span className="error-icon">❌</span> {errors.password}
              </div>
            )}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="add password" className="input-field"

            onChange={handleChange}
            value={values.password}
          />
        </div>
        <span>
          <Link to="/forgotpassword">Forgot password?</Link>
        </span>

        <button type="submit" className="signup-button mt-1">
            Sign-In
          </button>

        <span>
            Don't have an account? <a style={{ color: "#00DC64" }} href="/register" >Register</a>
          </span>
      </form>
    </div>
    <div className="image-section">
      <img src={girl} alt="Reading Girl" className="register-image" />
    </div> 
</div>
 
  );
};

export default Login;
