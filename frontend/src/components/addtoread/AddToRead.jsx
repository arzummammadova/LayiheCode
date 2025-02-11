import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginUser, fetchToReadBooks } from "../../redux/features/userSlice";

const AddToRead = () => {
    const dispatch = useDispatch();
    const { toReadBooks, user } = useSelector((state) => state.auth) || []; 
    const userId = user?._id;
  
    useEffect(() => {
      if (userId) {
        dispatch(fetchToReadBooks(userId));
      }
    }, [dispatch, userId]);
  
    return (
      <div className="p-4 bg-gray-50 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Your To-Read Books 📚</h2>
        {toReadBooks.length === 0 ? (
          <p>No books in your to-read list yet.</p>
        ) : (
          <ul className="space-y-3">
            {toReadBooks.map((book) => (
              <li
                key={book._id}
                className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition"
              >
                <img src={book.image} style={{width:"300px",height:"300px"}} alt="" />
                <h3 className="text-xl font-bold">{book.title}</h3>
                <p className="text-gray-600">Author: {book.author}</p>
                <p className="text-gray-500">{book.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default AddToRead;
