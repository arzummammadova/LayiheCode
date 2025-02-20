import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './recombook.scss'
const Recomendationbook = ({ genre, excludeId }) => {
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecommendedBooks = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/books/genre/${genre}/${excludeId}`);
                const data = await response.json();
                setRecommendedBooks(data.slice(0, 5)); 
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recommended books:', error);
                setLoading(false);
            }
        };

        fetchRecommendedBooks();
    }, [genre, excludeId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recomendation-book">
            <div className="container">
                <h4>Recommended Books</h4>
                <div className="row">
                    {recommendedBooks.map((book) => (
                        <div 
                            className="col-lg-2 col-md-4 col-sm-6 recom-book" 
                            key={book._id}
                        >
                            <div 
                                className="book-card" 
                                onClick={() => {
                                    navigate(`/details/${book._id}`);
                                    window.scrollTo(0, 0); 
                                }} 
                                style={{ cursor: 'pointer' }} 
                            >
                                <img src={book.image} alt={book.name} />
                                <h5>{book.name.slice(0,20)}...</h5>
                                <p style={{color:"green"}}>{book.author}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Recomendationbook;
