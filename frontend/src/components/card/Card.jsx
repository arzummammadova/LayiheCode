import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { IoHeartCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addAndRemoveFav, addtoRead } from "../../redux/features/userSlice";
import Swal from "sweetalert2";
import axios from "axios";
import "./Card.scss";

const Card = ({ book, onClick }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?._id);
  const favorites = useSelector((state) => state.auth.favorites) || [];
  const [isFavorite, setIsFavorite] = useState(false);
  const [comments, setComments] = useState([]);
  const [overallRating, setOverallRating] = useState(0);

  useEffect(() => {
    setIsFavorite(favorites.some((favBook) => favBook._id === book._id));
  }, [favorites, book._id]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books/${book._id}/reviews`);
      const reviews = response.data.reviews || [];
      setComments(reviews);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const calculateOverallRating = () => {
    if (comments.length === 0) return 0;

    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = totalRating / comments.length;
    return Math.round(averageRating * 10) / 10; 
  };

  useEffect(() => {
    fetchComments();
  }, [book._id]);

  useEffect(() => {
    const rating = calculateOverallRating();
    setOverallRating(rating);
  }, [comments]);

  const handleToggleFavorite = async (bookId) => {
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please log in to manage favorites",
        confirmButtonColor: "#ff0000",
      });
      return;
    }

    try {
      const result = await dispatch(addAndRemoveFav({ userId, bookId })).unwrap();

      if (result) {
        Swal.fire({
          icon: isFavorite ? "warning" : "success",
          title: isFavorite ? "Removed!" : "Added!",
          text: isFavorite ? "Removed from favorites." : "Added to favorites!",
          confirmButtonColor: isFavorite ? "#ffa500" : "#00c851",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update favorites. Please try again.",
        confirmButtonColor: "#ff0000",
      });
    }
  };

  // Oxuma siyahısına əlavə et (bu mene lazim olacaq )
  const handleAddToRead = async (bookId) => {
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please log in to add books to your 'to-read' list",
        confirmButtonColor: "#ff0000",
      });
      return;
    }

    try {
      await dispatch(addtoRead({ userId, bookId })).unwrap();
      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Successfully added to Read Later (Read Later səhifəsinə əlavə olundu)!",
        confirmButtonColor: "#00c851",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Already have Read Later page(Artıq Read Later səhifəsində mövcuddur)",
        confirmButtonColor: "#ff0000",
      });
    }
  };

  return (
    <div className="book-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <img src={book.image || "default-book.jpg"} alt={book.name} />
      <p className="name mt-1">{book.name}</p>
      <div className="author">{book.author}</div>

      {/* Ümumi reytinq */}
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

      {/* Favorit ürək ikonu */}
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

      {/* Oxuma siyahısına əlavə et düyməsi */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleAddToRead(book._id);
        }}
        className="button-container-3"
        style={{ width: "100%", height: "30px", marginTop: "10px" }}
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