import React from 'react';
import './footer.scss';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section brand">
          <div className="logo">
              <Link to="/" className=".logo" style={{fontSize:"30px"}}>
                Read <span  style={{color:"#00DC64"}} className="logospan">Ly</span>
              </Link>
            </div>
          </div>
          <div className="footer-section">
            <h4>Information</h4>
            <ul>
              <li>Helps</li>
              <li>FAQs</li>
              <li>Politics and policy</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>About</h4>
            <ul>
              <li>Helps</li>
              <li>FAQs</li>
              <li>Politics and policy</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>In Social Media</h4>
            <ul>
              <li>Helps</li>
              <li>FAQs</li>
              <li>Politics and policy</li>
            </ul>
          </div>
          <div className="footer-section security">
            <h4>Security</h4>
            <p>Все платежи защищены 3D Secure от Visa, Visa Electron, Maestro и MasterCard.</p>
            <div className="payment-icons">
              {/* <img src="visa.png" alt="Visa" /> */}
              {/* <img src="mastercard.png" alt="MasterCard" /> */}
            </div>
          </div>
        </div>

      
      </div>
      <div className="sosial-medias">
        <Link to='https://www.facebook.com/'>
        <FaFacebook />
        </Link>
        <Link  to='https://www.instagram.com/'>
        <AiFillInstagram/>
        </Link>
        <Link  to='https://www.twitter.com/'>
        <FaSquareXTwitter />
        </Link>
        <Link  to='https://www.twitter.com/'>
        <IoLogoLinkedin/>

        </Link>

      </div>
      <p className='copy-right'>
      © 2025 Readly. All Rights Reserved.

      </p>
    </footer>
  );
};

export default Footer;
