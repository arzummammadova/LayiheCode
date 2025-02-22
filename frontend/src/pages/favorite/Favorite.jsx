import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteallfav, fetchfav, deletefromfav } from "../../redux/features/userSlice";
import Chat from "../../components/chat/Chat";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Favorite = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth) || {};
  const favorites = useSelector((state) => state.auth.favorites) || [];
  const userId = user?._id;

  useEffect(() => {
    // console.log("User:", user);
    // console.log("Favorites:", favorites);
    if (userId) {
      dispatch(fetchfav(userId));
    }
  }, [dispatch, userId]);

  const handleDeleteAll = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete all!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteallfav(userId));
        Swal.fire(
          'Deleted!',
          'All favorites have been deleted.',
          'success'
        );
      }
    });
  };

  const handleDeletefromfav = (bookId) => {
    // console.log("Deleting book with ID:", bookId);
    // console.log("User ID:", userId);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletefromfav({ userId, bookId }));
        Swal.fire(
          'Deleted!',
          'The book has been deleted from favorites.',
          'success'
        );
      }
    });
  };

  return (
    <div>
      <div className="container">
        <Chat />
        <img
          style={{ height: "300px" }}
          src="https://marketplace.canva.com/EAFRRhzjDms/1/0/1600w/canva-cream-and-brown-illustrated-home-library-book-desktop-wallpaper-ZagR3UtWRxo.jpg"
          alt=""
        />
        <h3>Your favorite book is here</h3>
        {favorites.length > 0 ? (
          <ul className="space-y-3">
            <p style={{ color: "grey" }}> {favorites.length} kitab bəyənmisiniz</p>
            <div className="row">
              {favorites.map((book) => (
                <li key={book._id} className="p-4 transition col-lg-3">
                  <div className="card addcard">
                    <div className="image">
                      <Link to={`/details/${book._id}`}>
                      <img  src={book.image} style={{ height: "250px" }} alt="" />
                      </Link>
                     
                    </div>
                    <div className="text-add">
                      <p className="font-bold name mt-3">{book.name}</p>
                      <p className="text-gray-600">
                        Author: {book.author?.slice(0, 15)}..
                      </p>
                    </div>
                    <div
                      style={{ color: "red" }}
                      className="deleteall deleteicon deletefav"
                      onClick={() => handleDeletefromfav(book._id)}
                    >
                      <MdDeleteOutline size={25} />
                    </div>
                  </div>
                </li>
              ))}
            </div>
            <div className="btn btn-danger" onClick={handleDeleteAll}>
              Delete all
            </div>
          </ul>
        ) : (
          <p>No favorite books found.</p>
        )}
      </div>
    </div>
  );
};

export default Favorite;