import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchreaded, fetchToReadBooks } from '../../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './statics.scss';
import { CiEdit } from "react-icons/ci";

const Statics = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, toReadBooks, readed } = useSelector((state) => state.auth);
  const [target, setTarget] = useState(() => {
    // LocalStorage-dan hədəf dəyərini oxu
    const savedTarget = localStorage.getItem('readingTarget');
    return savedTarget ? parseInt(savedTarget, 10) : 20; // Əgər yoxdursa, 20 ilə başla
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchToReadBooks(user._id));
      dispatch(fetchreaded(user._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (readed.length > 0) {
      const percentage = (readed.length / target) * 100;
      setProgress(percentage > 100 ? 100 : percentage);
    }
  }, [readed, target]);

  // Hədəf dəyəri dəyişdikdə LocalStorage-a yaz
  useEffect(() => {
    localStorage.setItem('readingTarget', target);
  }, [target]);

  // Yeni useEffect: Hədəf 100% olduqda təbrik bildirişi göstər
  useEffect(() => {
    if (progress >= 100) {
      Swal.fire({
        title: 'Təbriklər! 🎉',
        text: 'Siz hədəfinizə çatdınız!',
        icon: 'success',
        confirmButtonColor: '#00DC64',
        background: '#f4f4f4',
        showClass: {
          popup: 'animate__animated animate__bounceIn',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut',
        },
      });
    }
  }, [progress]);

  const handleEditTarget = async () => {
    const { value: newTarget } = await Swal.fire({
      title: '<strong>Hədəf Kitab Sayını Dəyiş</strong>',
      html: `
        <p>Yeni hədəf kitab sayını daxil edin:</p>
        <input type="number" id="targetInput" class="swal2-input" min="1" step="1" value="${target}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: '#00DC64',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yadda Saxla',
      cancelButtonText: 'Ləğv et',
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        confirmButton: 'custom-swal-confirm-button',
        cancelButton: 'custom-swal-cancel-button',
      },
      didOpen: () => {
        const input = document.getElementById('targetInput');
        input.focus();
      },
      preConfirm: () => {
        const input = document.getElementById('targetInput');
        if (!input.value || isNaN(input.value) || input.value < 1) {
          Swal.showValidationMessage('Xahiş edirik düzgün bir dəyər daxil edin.');
        }
        return input.value;
      },
      background: '#f4f4f4',
      backdrop: `
        rgba(0, 0, 0, 0.5)
        url("/images/book-animation.gif")
        center left
        no-repeat
      `,
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });

    if (newTarget) {
      setTarget(parseInt(newTarget, 10));
      Swal.fire({
        title: 'Hədəf Yeniləndi!',
        text: `Yeni hədəf: ${newTarget} kitab`,
        icon: 'success',
        confirmButtonColor: '#00DC64',
        background: '#f4f4f4',
        showClass: {
          popup: 'animate__animated animate__bounceIn',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut',
        },
      });
    }
  };

  const handleBookClick = (bookId) => {
    navigate(`/details/${bookId}`);
  };

  return (
    <div className="statics-container">
      <h1> Kitab Oxuma Statistikası</h1>
      <p className='st-p'>Burada siz hədəflədiyiniz kitab sayını təyin edərək izləyə bilərsiniz </p>
      <div className="target-section">
        <p className='st-p'>Hədəf: <span onClick={handleEditTarget} className="target-value">{target} kitab</span></p>
        <button onClick={handleEditTarget} className="edit-button"><CiEdit size={25}/>
        </button>
      </div>
      <div className="progress-container">
        <div className="circular-progress">
          <svg width="250" height="250" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#e0e0e0" strokeWidth="10" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#00DC64"
              strokeWidth="10"
              fill="none"
              strokeDasharray="283"
              strokeDashoffset={`${283 - (progress / 100) * 283}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
            />
            <text x="50" y="55" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#333">
              {progress.toFixed(2)}%
            </text>
          </svg>
        </div>
      </div>
      <div className="books-section">
        <div className="books-list readed-books">
          <h2>📖 Oxunmuş Kitablar ({readed.length})</h2>
          <div className="row">
            {readed.map((book) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={book._id} onClick={() => handleBookClick(book._id)}>
                <img className='st-img' src={book.image} alt={book.name} />
                <span>{book.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="books-list to-read-books">
          <h2>📚 Oxunacaq Kitablar ({toReadBooks.length})</h2>
          <div className='row'>
            {toReadBooks.map((book) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={book._id} onClick={() => handleBookClick(book._id)}>
                <img className='st-img' src={book.image} alt={book.name} />
                <span>{book.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statics;