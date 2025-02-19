import React, { useEffect, useState } from 'react';
// import './Recomendationbook.scss';

const Recomendationbook = ({ genre, excludeId }) => {
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendedBooks = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/books/genre/${genre}/${excludeId}`);
                const data = await response.json();
                setRecommendedBooks(data);
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
                <h3>Recommended Books</h3>
                <div className="row">
                    {recommendedBooks.map((book) => (
                        <div className="col-lg-3 col-md-4 col-sm-6" key={book._id}>
                            <div className="book-card">
                                <img src={book.image} alt={book.name} />
                                <h4>{book.name}</h4>
                                <p>{book.author}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Recomendationbook;