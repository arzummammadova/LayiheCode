import React from 'react';
import './footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section brand">
            <h2>Readly</h2>
            <p>+994 55 514 01 99</p>
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
              <img src="visa.png" alt="Visa" />
              <img src="mastercard.png" alt="MasterCard" />
            </div>
          </div>
        </div>

      
      </div>
      <p className='copy-right'>
      © 2025 Readly. All Rights Reserved.

      </p>
    </footer>
  );
};

export default Footer;
