import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { IoHeartCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addAndRemoveFav, addtoRead } from "../../redux/features/userSlice";
import Swal from "sweetalert2";
import axios from "axios"; 
import './Card.scss'

const Card = ({ book, onClick }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?._id);
  const favorites = useSelector((state) => state.auth.favorites) || [];
  const [isFavorite, setIsFavorite] = useState(favorites.includes(book._id));
  const [comments, setComments] = useState([]); // State to store comments/reviews
  const [overallRating, setOverallRating] = useState(0); // State to store overall rating

  useEffect(() => {
    setIsFavorite(favorites.includes(book._id));
  }, [favorites, book._id]);

  // Fetch comments/reviews for the book
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books/${book._id}/reviews`);
      const reviews = response.data.reviews || [];
      setComments(reviews);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Calculate overall rating
  const calculateOverallRating = () => {
    if (comments.length === 0) return 0;

    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = totalRating / comments.length;
    return Math.round(averageRating * 10) / 10; // Round to 1 decimal place
  };

  // Fetch comments and calculate overall rating when the component mounts
  useEffect(() => {
    fetchComments();
  }, [book._id]);

  // Update overall rating whenever comments change
  useEffect(() => {
    const rating = calculateOverallRating();
    setOverallRating(rating);
  }, [comments]);

  const handleToggleFavorite = (bookId) => {
    if (!userId) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please log in to manage favorites",
        confirmButtonColor: "#ff0000",
      });
    }
    dispatch(addAndRemoveFav({ userId, bookId }));
    Swal.fire({
      icon: isFavorite ? "warning" : "success",
      title: isFavorite ? "Removed!" : "Added!",
      text: isFavorite ? "Removed from favorites." : "Added to favorites!",
      confirmButtonColor: isFavorite ? "#ffa500" : "#00c851",
    });
  };

  const handleAddToRead = (bookId) => {
    if (!userId) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please log in to add books to your 'to-read' list",
        confirmButtonColor: "#ff0000",
      });
    }
    dispatch(addtoRead({ userId, bookId }));
    Swal.fire({
      icon: "success",
      title: "Added!",
      text: "Successfully added to Read Later!",
      confirmButtonColor: "#00c851",
    });
  };

  return (
    <div className="book-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <img src={book.image || "default-book.jpg"} alt={book.name} />
      <p className="name mt-1">{book.name}</p>
      <div className="author">{book.author}</div>

      {/* Display overall rating */}
      <div className="overall-rating">
        <div className="stars">
          {[...Array(10)].map((_, index) => (
            <span
              key={index}
              className={`star ${index < overallRating ? "filled" : ""}`}
              style={{
                color: index < overallRating ? "#ffd700" : "#ccc",
                fontSize: "1.5rem",
                cursor: "pointer",
                transition: "transform 0.2s ease, color 0.2s ease",
              }}
            >
              ★
            </span>
          ))}
        </div>
        <span className="rating-value">({overallRating})</span>
      </div>

      {isFavorite ? (
        <IoHeartCircle
          onClick={(e) => {
            e.stopPropagation();
            handleToggleFavorite(book._id);
          }}
          className="icon favorite"
          style={{ color: "red" }}
        />
      ) : (
        <CiHeart
          onClick={(e) => {
            e.stopPropagation();
            handleToggleFavorite(book._id);
          }}
          className="icon"
        />
      )}

      <div
        onClick={(e) => {
          e.stopPropagation();
          handleAddToRead(book._id);
        }}
        className="button-container-3 "
        style={{ width: "100%", height: "30px",marginTop: "10px" }}
      >
        <span className="mas" style={{ marginTop: "6px" }}>
          Add to Read
        </span>
        <button style={{ height: "30px" }}>Add to Read</button>
      </div>
    </div>
  );
};

export default Card;