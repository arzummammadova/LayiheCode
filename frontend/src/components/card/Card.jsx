import React from 'react';
import { CiHeart } from 'react-icons/ci';

const Card = ({ book }) => {
    return (
        <div className="book-card">
            <img src={book.image || 'default-book.jpg'} alt={book.name} />
            <p className="name mt-1">{book.name}</p>
            <div className="author">{book.author}</div>
            
            <CiHeart className="icon" />
            <div className="button-container-3"  style={{width:"100%",height:"30px"}}>
                                <span className="mas" style={{marginTop:"6px"}} >Add to Read</span>
                                <button style={{height:"30px"}}>Add to Read</button>
                            </div>
        </div>
    );
};

export default Card; 