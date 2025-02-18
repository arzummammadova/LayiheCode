import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtoreaded, deleteAllFromToRead, deleteFromToRead, fetchToReadBooks } from "../../redux/features/userSlice";
import './adtoread.scss';
import { MdOutlineDelete, MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddToRead = () => {
    const dispatch = useDispatch();
    const { toReadBooks, user } = useSelector((state) => state.auth) || {}; 
    const userId = user?._id;
  
    useEffect(() => {
        if (userId) {
            dispatch(fetchToReadBooks(userId));
        }
    }, [dispatch, userId]);

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
    
    return (
        <section>
            <ToastContainer />
            <div className="container addtoread">
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
                                    <li key={book._id} className="p-4 transition col-lg-3">
                                        <div className="card addcard">
                                            <div className="image">
                                                <MdOutlineDelete onClick={() => handleDeletefrom(userId, book._id)} className="deleteicon" size={20} />
                                                <img src={book.image} style={{ height: "250px" }} alt="" />
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
            </div>
        </section>
    );
};

export default AddToRead;