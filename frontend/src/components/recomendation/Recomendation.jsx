import React from "react";
import "./recom.scss";
import { FiHeart } from "react-icons/fi";
import cat1 from "../../assets/images/cat1.png";
import Title from "../title/Title";
import { Link } from "react-router-dom";
const books = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, image:`${cat1}` },
  { id: 2, title: "1984", author: "George Orwell", year: 1949, image: `${cat1}` },
  { id: 3, title: "Pride and Prejudice", author: "Jane Austen", year: 1813, image: `${cat1}` },
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, image:`${cat1}` },
  { id: 2, title: "1984", author: "George Orwell", year: 1949, image: `${cat1}` },
  { id: 3, title: "Pride and Prejudice", author: "Jane Austen", year: 1813, image: `${cat1}` },
];

const Recomendation = () => {
  return (
    <div className="recomendation">
           <Title>
                    <div className="row p-5">
                        <div className="col-6">
                            <div className="title-l">
                              Our recommendation books
                            </div>
                        </div>

                        <div className="col-6" style={{ justifyContent: 'flex-end', display: 'flex' }}>
                            <Link to='/' className="mainbtn">
                                Explore more
                            </Link>
                        </div>


                    </div>

                </Title>

      <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book-item">
          <img src={book.image} alt={book.title} className="book-image" />
          <div className="book-info">
            <div className="book-title">{book.title}</div>
            <div className="book-author">{book.author}</div>
            <div className="book-description">A short description her...</div>
          </div>
          <FiHeart className="favorite-icon" />
        </div>
    
      ))}
    </div>   
    </div>
   
  );
};

export default Recomendation
