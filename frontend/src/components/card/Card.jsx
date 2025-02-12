import React from 'react';
import { CiHeart } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { addtoRead } from '../../redux/features/userSlice';



const Card = ({ book, onClick }) => {
    const dispatch=useDispatch()
    const userId = useSelector((state) => state.auth.user?._id); 
      const handleAddToRead = (bookId) => {
        if (!userId) {
          // You can show an alert or a redirect to login page if the user is not logged in
          alert('Please log in to add books to your "to-read" list');
          return;
        }
        // Dispatch addToRead action with userId and bookId
        dispatch(addtoRead({ userId, bookId }));
        alert("suscceflly added!")
      };
    return (
        <div className="book-card" onClick={onClick} style={{ cursor: 'pointer' }}>
            <img src={book.image || 'default-book.jpg'} alt={book.name} />
            <p className="name mt-1">{book.name}</p>
            <div className="author">{book.author}</div>
            
            <CiHeart className="icon" />
            <div onClick={(e)=>{  e.stopPropagation(); handleAddToRead(book._id)}} className="button-container-3" style={{ width: "100%", height: "30px" }}>
                <span className="mas" style={{ marginTop: "6px" }}>Add to Read</span>
                <button style={{ height: "30px" }}>Add to Read</button>
               
            </div>
           

        </div>
    );
};

export default Card;
