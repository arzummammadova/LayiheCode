import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Title from "../../components/title/Title";
import { sortRatingHtL } from "../../redux/features/productSlice";
import "./recom.scss"; 
import Chat from "../../components/chat/Chat";

const RecommendationPage = () => {
    const books = useSelector((state) => state.products.products) || [];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(sortRatingHtL());
        window.scrollTo(0, 0);
    }, [dispatch]);

    const goToDetails = (id) => {
        navigate(`/details/${id}`);
    };

    return (
        <section className="recommendation-container">
            <Chat/>
            <div className="container">
                <Title>
                    <h2 className="recommendation-title">Top 10 Recommended Books</h2>
                </Title>

                <div className="book-list">
                    {books.slice(0, 10).map((book, index) => (
                        <div key={book._id} className="book-card" onClick={() => goToDetails(book._id)}>
                         
                            <img src={book.image} alt={book.name} className="book-image" />
                            <div className="book-rank ">#{index + 1}</div>
                            <div className="book-info">
                                <h3 className="book-title">{book.name}</h3>
                                <p className="book-author">{book.author}</p>
                                <p className="book-description">
                                    {book.description.length > 300 ? `${book.description.slice(0, 300)}...` : book.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecommendationPage;
