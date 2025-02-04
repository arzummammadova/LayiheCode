import React from 'react'
import './hero.scss'
const Hero = () => {
  return (
    <>

    <section id='hero'>
        <div className="h">
            <div className="hero">
                <div className="row ">
                    <div className="col-6 left">
                        <p className='header'>
                        Best Design of</p>
                        <h1 className='headermain'>Furniture Collections</h1>
                        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                        <button className=' herobtn btnbig'>Discover</button>
                    </div>

                    <div className="col-6 right">
                        <figure>
                            <img src="https://preview.colorlib.com/theme/furnish/images/bg_2.jpg.webp" alt="" />
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
