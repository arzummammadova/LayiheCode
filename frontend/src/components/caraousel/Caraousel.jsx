import React, { useState, useRef } from 'react';
import './caraousel.scss';
import { FiArrowLeftCircle } from "react-icons/fi";
import { FiArrowRightCircle } from "react-icons/fi";
import cat1 from '../../assets/images/cat1.png';
import cat2 from '../../assets/images/cat2.png';

const Caraousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);

  const imagesPerPage = 4; // 1 səhifədə 4 şəkil
  const totalImages = 12; // Ümumi şəkil sayı

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - imagesPerPage : prevIndex - imagesPerPage
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= totalImages - imagesPerPage ? 0 : prevIndex + imagesPerPage
    );
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNextClick();
      } else {
        handlePrevClick();
      }
      setIsDragging(false);
    }
  };

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = startX - currentX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNextClick();
      } else {
        handlePrevClick();
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div>
      <div className="caraousel">
        <div className="left-arrow" onClick={handlePrevClick}>
          <FiArrowLeftCircle />
        </div>
        <div
          className="box-galleries"
          ref={carouselRef}
          style={{ transform: `translateX(-${currentIndex * (100 / imagesPerPage)}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {[...Array(totalImages)].map((_, index) => (
            <div
              className={`box-gallery ${index >= currentIndex && index < currentIndex + imagesPerPage ? 'active' : ''}`}
              key={index}
            >
              <img src={index % 2 === 0 ? cat1 : cat2} alt="" />
              <p>{index % 2 === 0 ? 'horror' : 'romance'}</p>
            </div>
          ))}
        </div>
        <div className="right-arrow" onClick={handleNextClick}>
          <FiArrowRightCircle />
        </div>
      </div>
    </div>
  );
};

export default Caraousel;