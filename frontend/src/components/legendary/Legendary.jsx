import React from "react";
import "./legend.scss";
import au1 from "../../assets/images/au1.jpg";
import au2 from "../../assets/images/au2.jpg";
import au3 from "../../assets/images/au3.jpg";
import au4 from "../../assets/images/au4.jpg";
import au5 from "../../assets/images/au5.jpg";
import au6 from "../../assets/images/au6.jpg";
import jane from "../../assets/images/jane.png";
import Title from "../title/Title";
import { Link } from "react-router-dom";


const AuthorGrid = () => {
  return (
    <div className="container">
          <Title>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="title-l">
                             Ən yaxşı yazıçını kəşf et 
                            </div>
                        </div>

                        <div className="col-6" style={{ justifyContent: 'flex-end', display: 'flex' }}>
                            <Link to='/all' className="mainbtn">
                                Explore more
                        </Link>
                        </div>


                    </div>

                </Title>
  
                <div className="row mt-3 ">
            <div className="col-lg-3 card-p">
                <img src={au1} alt="" />
                <button>William Shakespeare</button>
            </div>
            <div className="col-lg-3 card-p">
                <img src={au2} alt="" />
                <button>Lev Tolstoy</button>
            </div>
            <div className="col-lg-6 card-p">
                <img src={au3} alt="" />
                <button style={{width:"100%"}}>Franz Kafka</button>
            </div>

            
            
        </div>
        <div className="row mt-5">
            <div className="col-lg-5 card-p">
                <img src={au5} alt="" />
                <button>George Orwell</button>
            </div>
            <div className="col-lg-3 card-p">
                <img src={au6} alt="" />
                <button>Ernest Hemingway</button>
            </div>
            <div className="col-lg-4 card-p">
                <img src={au4} alt="" />
                <button style={{width:"100%"}}>Fyodor Dostoyevski </button>
            </div>
            
            
            
        </div>
    </div>

  );
};

export default AuthorGrid;
