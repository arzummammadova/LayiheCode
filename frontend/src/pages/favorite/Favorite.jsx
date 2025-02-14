import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchfav } from "../../redux/features/userSlice";
const Favorite = () => {
  const dispatch = useDispatch();
  const { favorites, user } = useSelector((state) => state.auth) || []; 
   const userId = user?._id;
   
     useEffect(() => {
       if (userId) {
         dispatch(fetchfav(userId));
       }
     }, [dispatch, userId]);
   
    //  useEffect(() => {
    //    console.log("Favorite Books:", favorite);
    //  }, [favorite]);
    console.log(favorites)
   
  return (

    <div>

        <div className="container">
            <img style={{height:"300px"}} src="https://marketplace.canva.com/EAFRRhzjDms/1/0/1600w/canva-cream-and-brown-illustrated-home-library-book-desktop-wallpaper-ZagR3UtWRxo.jpg" alt="" />
          <h3>Your favorite book is here</h3>  
            {favorites.length > 0 ? (
                 <ul className="space-y-3">
                             <p style={{color:"grey"}}> {favorites.length} kitab oxumusunuz</p>
                             <div className="row">
                           
                                  {favorites.map((book) => (
                               <li
                                 key={book._id}
                                 className=" p-4 transition col-lg-3"
                               >
                                 <div className="card addcard">
                                   
                                   <div className="image">
                                   {/* <MdOutlineDelete onClick={() => handleDeletefrom(userId, book._id)} className="deleteicon" size={20} /> */}
                                     <img src={book.image} style={{height:"250px"}} alt="" /> 
                                   </div>
                                   <div className="text-add">
                                        <p className="font-bold name mt-3">{book.name}</p>
                                 <p className="text-gray-600">Author: {book.author?.slice(0,15)}..</p>
                                  
                                   </div>
                                  
                             
                                 </div>
                 
                
                               </li>
                             ))
                             }  
                             
                               </div>
                            
                               {/* <div onClick={()=>{deleteAll()}} className="btn btn-danger deleteall">delete all</div>  */}
                            
                           </ul>
                ) : (
                  <p>No favorite books found.</p>
                )}
          
        </div>
        
      
    </div>
  )
}

export default Favorite
