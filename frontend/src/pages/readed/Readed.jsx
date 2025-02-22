import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllFromreaded, deletefromReaded, fetchreaded } from "../../redux/features/userSlice";
import { MdOutlineDelete, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import Chat from "../../components/chat/Chat";

const Readed = () => {
  const dispatch = useDispatch();
  const { readed, user } = useSelector((state) => state.auth) || [];
  const userId = user?._id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchreaded(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    console.log("Readed Books:", readed);
  }, [readed]);

  const deleteAll = () => {
    Swal.fire({
      title: "Əminsiniz?",
      text: "Bütün kitablar silinəcək!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Bəli, sil!",
      cancelButtonText: "Ləğv et",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAllFromreaded(userId));
        Swal.fire({
          title: "Silindi!",
          text: "Bütün kitablar silindi.",
          icon: "success",
          confirmButtonColor: "#00c851",
        });
      }
    });
  };

  const handleDeletefrom = (userId, bookId) => {
    Swal.fire({
      title: "Əminsiniz?",
      text: "Bu kitab oxunmuşlar siyahısından silinəcək!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Bəli, sil!",
      cancelButtonText: "Ləğv et",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletefromReaded({ userId, bookId }));
        Swal.fire({
          title: "Silindi!",
          text: "Kitab oxunmuşlar siyahısından silindi.",
          icon: "success",
          confirmButtonColor: "#00c851",
        });
      }
    });
  };

  return (
    <div className="container">
      <Chat />
      <h2>Your readed books</h2>
      {readed.length > 0 ? (
        <ul className="space-y-3">
          <p style={{ color: "grey" }}> {readed.length} kitab oxumusunuz</p>
          <div className="row">
            {readed.map((book) => (
              <li key={book._id} className="p-4 transition col-lg-3">
                <div className="card addcard">
                  <div className="image">
                    <MdOutlineDelete
                      onClick={() => handleDeletefrom(userId, book._id)}
                      className="deleteicon"
                      size={20}
                    />
                    <img src={book.image} style={{ height: "250px" }} alt="" />
                  </div>
                  <div className="text-add">
                    <p className="font-bold name mt-3">{book.name}</p>
                    <p className="text-gray-600">Author: {book.author.slice(0, 15)}..</p>
                  </div>
                </div>
              </li>
            ))}
          </div>
          <div
            onClick={deleteAll}
            className="btn btn-danger deleteall"
          >
            Delete All <MdDelete />
          </div>
        </ul>
      ) : (
        <p>No readed books found.</p>
      )}
    </div>
  );
};

export default Readed;