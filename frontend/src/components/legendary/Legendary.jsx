import React from "react";
import "./legend.scss";
import jane from "../../assets/images/jane.png";
import Title from "../title/Title";
import { Link } from "react-router-dom";


const AuthorGrid = () => {
  return (
    <div className="container">
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
  
                <div className="row mt-5">
            <div className="col-lg-3 card-p">
                <img src={jane} alt="" />
                {/* <button>Add to basket</button> */}
            </div>
            <div className="col-lg-3 card-p">
                <img src={jane} alt="" />
                {/* <button>Add to basket</button> */}
            </div>
            <div className="col-lg-6 card-p">
                <img src={jane} alt="" />
                {/* <button style={{width:"100%"}}>Add to basket</button> */}
            </div>

            
            
        </div>
        <div className="row mt-5">
            <div className="col-lg-5 card-p">
                <img src={jane} alt="" />
                {/* <button>Add to basket</button> */}
            </div>
            <div className="col-lg-3 card-p">
                <img src={jane} alt="" />
                {/* <button>Add to basket</button> */}
            </div>
            <div className="col-lg-4 card-p">
                <img src={jane} alt="" />
                {/* <button style={{width:"100%"}}>Add to basket</button> */}
            </div>
            
            
            
        </div>
    </div>

  );
};

export default AuthorGrid;
