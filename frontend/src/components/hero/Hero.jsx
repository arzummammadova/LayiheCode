import React from 'react'
import './hero.scss'
import heroright from "../../assets/images/heroright.png"
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import right from "../../assets/icons/image9.svg"
const Hero = () => {
  return (
    <>

    <section id='hero'>
        <div className="h">
            <div className="hero">
                <div className="row ">
                    <div className="col-6 left">
                        <p className='header'>
                        Your Journey to a World of Stories Starts Here.</p>
                        {/* <h1 className='headermain'>Furniture Collections</h1> */}
                        <p className='mt-3'>Browse our vast collection of books, explore new releases, and get your hands on the latest bestsellers. Your next adventure is just a click away!</p>
                        <button className='btnsh'>Discover</button>
                    </div>

                    <div className="col-6 right">
                    <Link   to='/'className='popular-p'>watch today’s <span className='green'> popular
                        </span> book      
                    <FaRegArrowAltCircleRight />

                        {/* <img  src={right} alt="" /> */}
                    </Link>
                        <figure>
                            <img src={heroright} alt="auter" />

                        
                        </figure>

                       

                      
                    </div>
                </div>
            </div>
        </div>
    </section>
      
    </>
  )
}

export default Hero
