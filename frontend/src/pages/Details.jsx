import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Details = () => {

    const product=useSelector((state)=>state.products.products)
    const {id}=useParams()
    const selected=product.find((item)=>item._id==id)
  return (
    <>
   
      <div className="container">
      <h1>Details</h1>
        <div className="row">
            <div className="col-lg-6">
                <img src={selected.image} alt="" />
            </div>
            <div className="col-lg-6">
                <h2> {
                    selected.name
                }</h2>
                <p>{selected.price}</p>
                <p>{selected.description}</p>
               
            
            </div>
        </div>

      </div>
    </>
  )
}

export default Details
