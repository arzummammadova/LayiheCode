import React, { useEffect } from 'react';
import Title from '../title/Title';
import './books.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../redux/features/productSlice';
import { addtoRead } from '../../redux/features/userSlice';

const Books = () => {
  const books = useSelector((state) => state.products.products) || [];
  const userId = useSelector((state) => state.auth.user?._id); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const godetails = (id) => {
    navigate(`/details/${id}`);
  };

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
    <div>
      <div className="container">
        <Title>
          <div className="row p-1 mt-4">
            <div className="col-6">
              <div className="title-l d-lg-block">This week's most popular books</div>
            </div>
            <div className="col-6" style={{ justifyContent: 'flex-end', display: 'flex' }}>
              <Link to="/all" className="mainbtn">
                Explore more
              </Link>
            </div>
          </div>
        </Title>

        <div className="row">
          {books.length > 0 ? (
            books.slice(0, 6).map((book) => (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  godetails(book._id);
                 
                }}
                className="col-lg-4 col-md-6 col-sm-12"
                id={book._id}
                key={book._id}
              >
                <div className="box">
                  <div className="box-top row">
                    <div className="col-6 box-left">
                      <img src={book.image} alt="" />
                    </div>
                    <div className="col-6 box-right">
                      <p className="right-name">{book.name.slice(0, 10)}..</p>
                      <p className="autorname">{book.author}</p>
                      <p className="desc">{book.description.slice(0, 30)}...</p>
                      <p className="price">{book.price}</p>
                    </div>
                  </div>

                  <div className="box-bottom mt-2">
                    <button onClick={(e) =>{ e.stopPropagation();handleAddToRead(book._id)} }>Add to read +</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            'No products available'
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
