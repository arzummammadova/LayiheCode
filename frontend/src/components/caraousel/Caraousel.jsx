import React, { useState, useRef, useEffect } from 'react';
import './caraousel.scss';
import { FiArrowLeftCircle } from "react-icons/fi";
import { FiArrowRightCircle } from "react-icons/fi";
import cat1 from '../../assets/images/catt1.jpg'; // Classics
import cat2 from '../../assets/images/cat2.jpeg'; // Fantasy
import cat3 from '../../assets/images/cat3.jpg.optimal.jpg'; // Romance
import cat4 from '../../assets/images/cat4.jpeg'; // Horror
import cat5 from '../../assets/images/cat5.jpg'; // Sci-Fi
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../redux/features/productSlice';
import Title from '../title/Title';

const categories = [
  { image: cat1, label: 'Classics', route: '/category/classics' },
  { image: cat5, label: 'Fantasy', route: '/category/fantasy' },
  { image: cat3, label: 'Romance', route: '/category/romance' },
  { image: cat4, label: 'Sci-Fi', route: '/category/scifi' },
  { image: cat2, label: 'Horror', route: '/category/horror' },

];

const Caraousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);

  const imagesPerPage = 4; 
  const totalImages = categories.length;
  const books = useSelector((state) => state.products.products) || [];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
    window.scrollTo(0, 0);
  }, [dispatch]);

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

  const handleCategoryClick = (route) => {
    navigate(route);
  };

  return (
    <div>
      <div className="container">
      <Title>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="title-l">
                            Kateqoriyalara uyğun kitablara bax
                            </div>
                        </div>

                     


                    </div>

                </Title>
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
            {categories.map((category, index) => (
              <div
                className={`box-gallery ${index >= currentIndex && index < currentIndex + imagesPerPage ? 'active' : ''}`}
                key={index}
                onClick={() => handleCategoryClick(category.route)}
              >
                <img src={category.image} alt={category.label} />
                <p className='category-name' >{category.label}</p>
              </div>
            ))}
          </div>
          <div className="right-arrow" onClick={handleNextClick}>
            <FiArrowRightCircle />
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Caraousel;
