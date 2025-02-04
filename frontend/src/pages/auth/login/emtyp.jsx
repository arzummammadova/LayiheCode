import React from 'react'
import girl from "../../../assets/images/girl.png";
import { Link } from "react-router-dom";
import '../register/Register.scss'
const Login = () => {
  return (
    <>
      <div className="register-container">
         
      <div className="register-card">
        <h2 className="title">
          Join <span className="logo">Read<span className="highlight">ly</span></span> - Unlock a World of Books!
        </h2>
        <div className="content">
        
          <div className="form-section">
            <div className="social-buttons">
              <button className="google-signin">
                {/* <img src="" alt="" /> */}
                Login with Google</button>
              <button className="google-signin">Login with Google</button>
            </div>
            <form className="register-form">
              <input type="text" placeholder="User Name" className="input-field" />
           
              <input type="password" placeholder="Password" className="input-field" />
              <p className="login-link">Did't have an account? <Link style={{color:"#00DC64"}} to='/register'>Register</Link></p>
              <button className="signup-button" >Sign in</button>
            </form>
          </div>
        </div>
      </div>
      <div className="image-section">
            <img src={girl} alt="Reading Girl" className="register-image" />
          </div>
    </div>
      
    </>
  )
}

export default Login
