import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProduct } from '../../redux/features/productSlice';
import { CiHeart } from 'react-icons/ci'; 

const Categories = () => {
  const { categoryName } = useParams(); 
  const books = useSelector((state) => state.products.products) || [];
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
const navigate=useNavigate()
  useEffect(() => {
    dispatch(fetchProduct()).finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [dispatch]);
  const godetails=(id)=>{
    navigate(`/details/${id}`)
}
 
  const booksByCategory = books.filter(book =>
    book.category.toLowerCase() === categoryName.toLowerCase()
  );

  if (loading) {
    return <div className="spinner-container">
    <div className="spinner"></div>
</div>
  }

  return (
    <div className="container">
      <h2>{categoryName} Books</h2>
      <div className="books-cards">
        {booksByCategory.length === 0 ? (
          <p>No books available in this category.</p>
        ) : (
          booksByCategory.map((book, index) => (
            <div key={index} className="book-card" style={{ cursor: 'pointer' }} onClick={() => godetails(book._id)} >
              <img
                src={book.image }
                alt={book.name}
              />
              <p className="name mt-1">{book.name}</p>
              <div className="author">{book.author}</div>
              <CiHeart className="icon" />
              <div className="button-container-3" style={{ width: '100%', height: '30px' }}>
                <span className="mas" style={{ marginTop: '6px' }}>Add to Read</span>
                <button style={{ height: '30px' }}>Add to Read</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;
