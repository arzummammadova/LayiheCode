import React, { useEffect, useState } from 'react';
import './allbook.scss';
import Card from '../../components/card/Card';
import { CiSearch } from "react-icons/ci";

import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, searchProduct, sortRatingHtL, sortRatingLtH } from '../../redux/features/productSlice';
import { useNavigate } from 'react-router-dom';
import Delivery from '../../components/delivery/Delivery';
import Chat from '../../components/chat/Chat';

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
    const navigate = useNavigate();

    const [selectedGenre, setSelectedGenre] = useState(localStorage.getItem('selectedGenre') || 'All Books');
    const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');
    const [currentPage, setCurrentPage] = useState(Number(localStorage.getItem('currentPage')) || 1);
    const [sortOrder, setSortOrder] = useState(localStorage.getItem('sortOrder') || ''); 
    const booksPerPage = 20;
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchProduct()).finally(() => {
            setLoading(false);
          
            if (sortOrder === "lowToHigh") {
                dispatch(sortRatingLtH());
            } else if (sortOrder === "highToLow") {
                dispatch(sortRatingHtL());
            }
        });
        window.scrollTo(0, 0);
    }, [dispatch, sortOrder]);  

    useEffect(() => {
        if (searchTerm) {
            dispatch(searchProduct(searchTerm));
        } else {
            dispatch(fetchProduct());
        }
    }, [searchTerm, dispatch]);

    useEffect(() => {
        localStorage.setItem('selectedGenre', selectedGenre);
    }, [selectedGenre]);

    useEffect(() => {
        localStorage.setItem('searchTerm', searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        localStorage.setItem('currentPage', currentPage);
    }, [currentPage]);

    useEffect(() => {
        localStorage.setItem('sortOrder', sortOrder);
    }, [sortOrder]);  

    const godetails = (id) => {
        navigate(`/details/${id}`)
    };

    const handleSelect = (genre) => {
        const updatedGenre = genre === 'all' ? 'All Books' : genre;
        setSelectedGenre(updatedGenre);
        setIsOpen(false);
        setCurrentPage(1);
    };

    const handleSortChange = (e) => {
        const selectedValue = e.target.value;
        setSortOrder(selectedValue);
        if (selectedValue === "lowToHigh") {
            dispatch(sortRatingLtH());
        } else if (selectedValue === "highToLow") {
            dispatch(sortRatingHtL());
        }
    };

    const filteredBooks = books.filter((book) =>
        (selectedGenre === 'All Books' || book.genre === selectedGenre) &&
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    return (
        <div className="all_books">
            <div className="container">
                <Chat/>
                <div className="sorts">
                    <div className="filter-s">
                        <div className="select">
                            <div className={`select-box ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
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
                        <select value={sortOrder} onChange={handleSortChange}>
                            <option value="" disabled>Select</option>
                            <option value="highToLow">Most Popular</option>
                            <option value="lowToHigh">Less Popular</option>
                        </select>   
                    </div>
                    <div className="find">
                        <input
                            type="text"
                            placeholder='Find book...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <CiSearch className='search-i' />
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
                                godetails(book._id);
                            }} key={book._id} book={book} />
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
            <Delivery/>      
        </div>
    );
};

export default AllBooks;