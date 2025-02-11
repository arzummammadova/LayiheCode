import React, { useEffect } from "react";
import "./recom.scss";
import { FiHeart } from "react-icons/fi";

import Title from "../title/Title";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../redux/features/productSlice";

const Recomendation = () => {
  const books=useSelector((state)=>state.products.products)||[]
  const navigate=useNavigate()
  const dispatch=useDispatch()
    useEffect(() => {
      
      dispatch(fetchProduct())
      window.scrollTo(0, 0);
    }, [dispatch]);
  //   console.log(books)
  const godetails=(id)=>{
      navigate(`/details/${id}`)
  }
  return (
    
    <section id="recom">
      <div className="container">
        <div className="recomendation ">
           <Title>
                    <div className="row p-1">
                        <div className="col-6">
                            <div className="title-l">
                              Our recommendation books
                            </div>
                        </div>

                        <div className="col-6" style={{ justifyContent: 'flex-end', display: 'flex' }}>
                            <Link to='/all' className="mainbtn">
                                Explore more
                            </Link>
                        </div>


                    </div>

                </Title>

      <div className="book-list mt-4" >
      {books.slice(0, 9).map((book, index) => (
  <div key={book.id} className="book-item"  onClick={() => godetails(book._id)}>
    <img src={book.image} alt={book.title} className="book-image" />
    <div className="count" style={{fontWeight:"bold",fontSize:"16px"}}>
      {index + 1} 
    </div>
    <div className="book-info">
      <div className="book-title">{book.title}</div>
      <div className="book-author">{book.author}</div>
      <div className="book-description">A short description here...</div>
    </div>
    {/* <FiHeart className="favorite-icon" /> */}
  </div>
))}

    </div>   
    </div> 
      </div>
    </section>
   
   
  );
};

export default Recomendation
