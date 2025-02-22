import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaPinterest,
  FaReddit,
  FaTelegram,
  FaInstagram,
  FaLink,
} from 'react-icons/fa';
import Swal from 'sweetalert2'; // Import SweetAlert2

const ShareModal = ({ onClose }) => {
  const currentUrl = window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        // Show SweetAlert2 success message
        Swal.fire({
          icon: 'success',
          title: 'Link copied to clipboard!',
          showConfirmButton: false,
          timer: 1500, // Auto-close after 1.5 seconds
        });
      })
      .catch((error) => {
        // Show SweetAlert2 error message if copying fails
        Swal.fire({
          icon: 'error',
          title: 'Failed to copy link',
          text: 'Please try again.',
        });
        console.error('Failed to copy link:', error);
      });
  };

  return (
    <div className="share-modal-overlay">
      <div className="share-modal">
        <button className="close-modal" onClick={onClose}>
          ×
        </button>
        <h3 className="sharename">Share this product</h3>
        <div className="social-icons">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="facebook"
          >
            <FaFacebook size={30} />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="twitter"
          >
            <FaTwitter size={30} />
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin"
          >
            <FaLinkedin size={30} />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp"
          >
            <FaWhatsapp size={30} />
          </a>
          <a
            href={`https://t.me/share/url?url=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="telegram"
          >
            <FaTelegram size={30} />
          </a>
          <a
            href={`https://pinterest.com/pin/create/button/?url=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="pinterest"
          >
            <FaPinterest size={30} />
          </a>
          <a
            href={`https://reddit.com/submit?url=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="reddit"
          >
            <FaReddit size={30} />
          </a>
          <a
            href={`https://www.instagram.com/?url=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="instagram"
          >
            <FaInstagram size={30} />
          </a>
        </div>
        <button className="copy-link" onClick={copyToClipboard}>
          <FaLink size={20} /> Copy Link
        </button>
      </div>
    </div>
  );
};

export default ShareModal;