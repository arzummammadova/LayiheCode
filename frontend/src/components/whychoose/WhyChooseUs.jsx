import React from "react";
import "./WhyChooseUs.scss";
import Title from "../title/Title";
import { Link } from "react-router-dom";
const WhyChooseUs = () => {
  return (
  <section className="why-choose-us">
        
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

    <div className="container">


      <div className="features-container">
        <div className="feature-box feature-1">
          <h3>Curated Recommendations</h3>
          <p>Get personalized book suggestions tailored to your taste and interests.</p>
        </div>
        <div className="feature-box feature-2">
          <h3>Engaged Community</h3>
          <p>Join a vibrant community of passionate readers and share your thoughts.</p>
        </div>
        <div className="feature-box feature-3">
          <h3>Track Your Progress</h3>
          <p>Keep track of the books you've read and set new reading goals.</p>
        </div>
        <div className="feature-box feature-4">
          <h3>Easy Reviews</h3>
          <p>Write and share reviews with just a few clicks to help others discover great books.</p>
        </div>
      </div>
    </div>
    </section>
  
  );
};

export default WhyChooseUs;
