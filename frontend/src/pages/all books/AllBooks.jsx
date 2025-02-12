import React, { useEffect, useState } from 'react';
import './allbook.scss';
import Card from '../../components/card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, searchProduct } from '../../redux/features/productSlice';
import { useNavigate } from 'react-router-dom';

const genres = [
    'all',
    'Fiction',
    'Non-Fiction',
    'Mystery',
    'Fantasy',
    'Sci-Fi',
    'Romance',
    'Thriller',
    'Biography',
    'Classics'
];

const AllBooks = () => {
    const books = useSelector((state) => state.products.products) || [];
    const dispatch = useDispatch();
    const [selectedGenre, setSelectedGenre] = useState('All Books');
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 20;
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();
    useEffect(() => {
        dispatch(fetchProduct()).finally(() => setLoading(false));
        window.scrollTo(0, 0);
    }, [dispatch]);

    const godetails=(id)=>{
        navigate(`/details/${id}`)
    }

    useEffect(() => {
        if (searchTerm) {
            dispatch(searchProduct(searchTerm));
        } else {
            dispatch(fetchProduct());
        }
    }, [searchTerm, dispatch]);

    const handleSelect = (genre) => {
        setSelectedGenre(genre === 'all' ? 'All Books' : genre);
        setIsOpen(false);
        setCurrentPage(1); 
    };


    const filteredBooks = books.filter((book) => 
        (selectedGenre === 'All Books' || book.genre === selectedGenre) &&
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(books)

  
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    return (
        <div className="container">
            <div className="sorts">
                <div className="select">
                    <div
                        className={`select-box ${isOpen ? 'open' : ''}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {selectedGenre}
                        <span className="arrow">▾</span>
                    </div>
                    {isOpen && (
                        <ul className="options">
                            {genres.map((genre) => (
                                <li
                                    key={genre}
                                    onClick={() => handleSelect(genre)}
                                    className={selectedGenre === genre ? 'selected' : ''}
                                >
                                    {genre}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="find">
                    <input 
                        type="text" 
                        placeholder='Find book...' 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                </div>
            </div>

            <div className="books-cards">
                {loading ? (
                    <div className="spin">
                           <div className="spinner"></div>
                    </div>
                 
                ) : (
                    currentBooks.map((book) => (
                        <Card onClick={(e) => {
                            e.stopPropagation();
                           
                            godetails(book._id)}} key={book._id} book={book} />

                      
                       
                   
                    ))
                )}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={currentPage === index + 1 ? 'active' : ''}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllBooks;