import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { IoHeartCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addAndRemoveFav, addtoRead } from "../../redux/features/userSlice";
import Swal from "sweetalert2";

const Card = ({ book, onClick }) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.user?._id);
    const favorites = useSelector((state) => state.auth.favorites) || [];
    const [isFavorite, setIsFavorite] = useState(favorites.includes(book._id));

    useEffect(() => {
        setIsFavorite(favorites.includes(book._id));
    }, [favorites, book._id]);

    const handleToggleFavorite = (bookId) => {
        if (!userId) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please log in to manage favorites",
                confirmButtonColor: "#ff0000"
            });
        }
        dispatch(addAndRemoveFav({ userId, bookId }));
        Swal.fire({
            icon: isFavorite ? "warning" : "success",
            title: isFavorite ? "Removed!" : "Added!",
            text: isFavorite ? "Removed from favorites." : "Added to favorites!",
            confirmButtonColor: isFavorite ? "#ffa500" : "#00c851"
        });
    };

    const handleAddToRead = (bookId) => {
        if (!userId) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please log in to add books to your 'to-read' list",
                confirmButtonColor: "#ff0000"
            });
        }
        dispatch(addtoRead({ userId, bookId }));
        Swal.fire({
            icon: "success",
            title: "Added!",
            text: "Successfully added to Read Later!",
            confirmButtonColor: "#00c851"
        });
    };

    return (
        <div className="book-card" onClick={onClick} style={{ cursor: 'pointer' }}>
            <img src={book.image || 'default-book.jpg'} alt={book.name} />
            <p className="name mt-1">{book.name}</p>
            <div className="author">{book.author}</div>

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

            <div onClick={(e) => { e.stopPropagation(); handleAddToRead(book._id); }} className="button-container-3" style={{ width: "100%", height: "30px" }}>
                <span className="mas" style={{ marginTop: "6px" }}>Add to Read</span>
                <button style={{ height: "30px" }}>Add to Read</button>
            </div>
        </div>
    );
};

export default Card;
