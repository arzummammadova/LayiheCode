import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../../redux/features/productSlice';

const Author = () => {
  const { authorname } = useParams();
  const books = useSelector((state) => state.products.products) || [];
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct()).finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [dispatch]);

  const booksByAuthor = books.filter((book) => book.author === authorname);

  if (loading) {
    return <div>Yüklənir...</div>;
  }

  return (
    <div className="container">
      <h2>{authorname}-ın Kitabları</h2>
      {booksByAuthor.length > 0 ? (
        <ul>
          {booksByAuthor.map((book) => (
            <li key={book._id}>{book.title}</li>
          ))}
        </ul>
      ) : (
        <p>Bu müəllifə aid kitab tapılmadı.</p>
      )}
    </div>
  );
};

export default Author;
