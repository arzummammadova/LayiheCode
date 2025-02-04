import React from 'react'
import Title from '../title/Title'
// import '../title/title.scss'
import './product.scss'
const Products = () => {
  return (
    <>

    <div className="section">
        <div className="products">
            <Title>
                <div className="title-p">
                Our Finish Projects
                </div>
                <div className="title-h">
                Furniture Collection
                </div>
            </Title>

            <div className="row mt-5">
            <div className="col-lg-3 card-p">
                <img src="https://preview.colorlib.com/theme/furnish/images/gallery-1.jpg.webp" alt="" />
                <button>Add to basket</button>
            </div>
            <div className="col-lg-3 card-p">
                <img src="https://preview.colorlib.com/theme/furnish/images/gallery-2.jpg.webp" alt="" />
                <button>Add to basket</button>
            </div>
            <div className="col-lg-6 card-p">
                <img src="https://preview.colorlib.com/theme/furnish/images/gallery-3.jpg.webp" alt="" />
                <button style={{width:"100%"}}>Add to basket</button>
            </div>

            
            
        </div>
        <div className="row mt-5">
            <div className="col-lg-5 card-p">
                <img src="https://preview.colorlib.com/theme/furnish/images/gallery-4.jpg.webp" alt="" />
                <button>Add to basket</button>
            </div>
            <div className="col-lg-3 card-p">
                <img src="https://preview.colorlib.com/theme/furnish/images/gallery-5.jpg.webp" alt="" />
                <button>Add to basket</button>
            </div>
            <div className="col-lg-4 card-p">
                <img src="https://preview.colorlib.com/theme/furnish/images/gallery-6.jpg.webp" alt="" />
                <button style={{width:"100%"}}>Add to basket</button>
            </div>
            
            
            
        </div>
        </div>

       
    </div>
      
    </>
  )
}

export default Products
