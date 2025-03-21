import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtoreaded, deleteAllFromToRead, deleteFromToRead, fetchToReadBooks } from "../../redux/features/userSlice";
import './adtoread.scss';
import { MdOutlineDelete, MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import { Link } from "react-router-dom";
const AddToRead = () => {
    const dispatch = useDispatch();
    const { toReadBooks, user } = useSelector((state) => state.auth) || {}; 
    const userId = user?._id;
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    useEffect(() => {
        if (userId) {
            dispatch(fetchToReadBooks(userId));
        }
    }, [dispatch, userId]);
  
    const navigate = useNavigate();

    const goToDetails = (bookId) => {
        navigate(`/details/${bookId}`);
    };

    const handleDeleteAll = () => {
        dispatch(deleteAllFromToRead(userId));
        toast.info("Bütün kitablar silindi.");
    };
    
    const handleDeletefrom = (userId, bookId) => {
        dispatch(deleteFromToRead({ userId, bookId }));
        toast.warn("Kitab silindi.");
    };
    
    const handleAddToReaded = (userId, bookId) => {
        if (!userId) {
            return toast.error("Zəhmət olmasa, oxundu kimi işarələmək üçün daxil olun.");
        }
        dispatch(addtoreaded({ userId, bookId })).then(() => {
            dispatch(deleteFromToRead({ userId, bookId }));
            toast.success("Kitab oxundu kimi işarələndi!");
        });
    };
    const fetchRecommendedBooks = async () => {
        if (toReadBooks.length === 0) return;
    
        const categories = [...new Set(toReadBooks.map((book) => book.category))];
        const excludeIds = toReadBooks.map((book) => book._id);
    
        try {
            const { data } = await axios.post("http://localhost:5000/api/books/recommendations", { categories, excludeIds });
            setRecommendedBooks(data);
        } catch (error) {
            console.error("Tövsiyə olunan kitabları yükləmək mümkün olmadı", error);
        }
    };
    useEffect(() => {
        fetchRecommendedBooks();
    }, [toReadBooks]);
    
    return (
        <section>
        
            <Chat/>
            <div className="container addtoread">
            <ToastContainer autoClose={3000} />
                <img style={{ height: "270px", objectFit: "cover" }} src="https://cdn.dribbble.com/users/2140475/screenshots/15528887/media/6cb693316efc9d7da75e7416621c7101.jpg?resize=1200x900&vertical=center" alt="" />
                <div className="p-4 bg-gray-50 rounded-xl shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Your To-Read Books</h2>
                    {toReadBooks.length === 0 ? (
                        <p>No books in your to-read list yet.</p>
                    ) : (
                        <ul className="space-y-3">
                            <p style={{ color: "grey" }}>{toReadBooks.length} kitab oxuyacaqsınız</p>
                            <div className="row">
                                {toReadBooks.map((book) => (
                                    <li key={book._id} className="p-4 transition col-lg-3 col-md-4">
                                        <div className="card addcard">
                                            <div className="image">
                                                <MdOutlineDelete onClick={() => handleDeletefrom(userId, book._id)} className="deleteicon" size={20} />
                                                <Link to={`/details/${book._id}`}>
                                                <img src={book.image} style={{ height: "250px" }} alt="" />
                                                </Link>
                                            </div>
                                            <div className="text-add">
                                                <p className="font-bold name mt-3">{book.name}</p>
                                                <p className="text-gray-600">{book.author.slice(0, 15)}...</p>
                                                <div className="mainbtn" onClick={() => handleAddToReaded(userId, book._id)}>Oxudum</div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </div>
                            <div onClick={handleDeleteAll} className="btn btn-danger deleteall">Delete All <MdDelete /></div>
                        </ul>
                    )}
                </div>
                <div className="book-recommendations">
            <h3 className="section-title">You May Also Like</h3>
            <div className="book-grid row">
                {recommendedBooks.length === 0 ? (
                    <p className="no-recommendation">Uyğun tövsiyə tapılmadı.</p>
                ) : (
                    recommendedBooks.map((book) => (
                        <div key={book._id} className="book-item " onClick={() => goToDetails(book._id)}>
                            <div className="book-card">
                                <img src={book.image} alt={book.name} className="book-cover" />
                                <div className="book-info">
                                    <p className="book-title">{book.name}</p>
                                    <p className="book-author">{book.author}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
            </div>
          

        </section>
    );
};

export default AddToRead;