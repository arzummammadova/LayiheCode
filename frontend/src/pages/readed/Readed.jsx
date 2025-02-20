import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  deleteAllFromreaded, deletefromReaded, fetchreaded } from "../../redux/features/userSlice";
import {toast, ToastContainer } from "react-toastify";
import { MdOutlineDelete, MdDelete } from "react-icons/md";
import Chat from "../../components/chat/Chat";
const Readed = () => {
  const dispatch = useDispatch();
 const {  readed, user } = useSelector((state) => state.auth) || []; 
  const userId = user?._id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchreaded(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    console.log("Favorite Books:", readed);
  }, [readed]);

  const deleteAll=()=>{
    dispatch(deleteAllFromreaded(userId))
    toast.error("Bütün kitablar silindi.");

  }
  const handleDeletefrom = (userId, bookId) => {
        dispatch(deletefromReaded({ userId, bookId }));
        toast.warn("Kitab oxunduqlarindan  silindi.");
    };
  return (
    <div className="container">
      <Chat/>
      <ToastContainer/>
      <h2>Sənin oxuduğun kitablar</h2>
      {readed.length > 0 ? (
       <ul className="space-y-3">
                   <p style={{color:"grey"}}> {readed.length} kitab oxumusunuz</p>
                   <div className="row">
                 
                        {readed.map((book) => (
                     <li
                       key={book._id}
                       className=" p-4 transition col-lg-3"
                     >
                       <div className="card addcard">
                         
                         <div className="image">
                         <MdOutlineDelete onClick={() => handleDeletefrom(userId, book._id)} className="deleteicon" size={20} />
                           <img src={book.image} style={{height:"250px"}} alt="" /> 
                         </div>
                         <div className="text-add">
                              <p className="font-bold name mt-3">{book.name}</p>
                       <p className="text-gray-600">Author: {book.author.slice(0,15)}..</p>
                        
                         </div>
                        
                   
                       </div>
       
      
                     </li>
                   ))
                   }  
                   
                     </div>
                  
                     <div onClick={()=>{deleteAll()}} className="btn btn-danger deleteall">delete all</div> 
                  
                 </ul>
      ) : (
        <p>No favorite books found.</p>
      )}

    
    </div>
  );
};

export default Readed;
