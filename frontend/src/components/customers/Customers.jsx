import React, { useEffect } from 'react'
import Title from '../title/Title'
import './customers.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../../redux/features/productSlice'
import { addtobasket } from '../../redux/features/basketSlice'
import { useNavigate } from 'react-router-dom'

const Customers = () => {
    const products=useSelector((state)=>state.products.products)
    console.log(products)
    const basket=useSelector((state)=>state.basket.basket)
    console.log(basket)

    const dispatch=useDispatch()
    const nav=useNavigate()

    const godetails=(id)=>{
        nav(`/details/${id}`)
    }


    useEffect(() => {
        
        dispatch(fetchProduct())
    }, [dispatch]);

    const addToBAsket=(product)=>{
        dispatch(addtobasket(product))
    }
    // console.log(products)

    return (
        <>

            <section id="customers">

                <div className="container">

                    <Title>
                        <div className="title-p">
                            Testimonial
                        </div>
                        <div className="title-h">
                            Happy Customers
                        </div>
                    </Title>
                    <div className="customers">
                        <div className="c-cards">
                            {
                                products.length>0?(
                                   products.slice(0,3).map((product)=>
                                    <div className="c-card"key={product._id} onClick={(e)=>{
                                        e.stopPropagation()
                                        godetails(product._id)}}>
                                   <p>
                                       {
                                        product.description
                                       }
                                   </p>

                                   <div className="bottom">
   
                                       <figure>
                                           <img src={product.image} alt="" />
                                       </figure>
                                       <div className="texts">
                                         <p className="name">
                                          {product.name}
                                       </p>
                                       <p className='role'>Marketing Manager</p>    
                                       </div>
                                     
                                     
   
                                   </div>
                                   <button className='btnbasket' onClick={(e)=>{
                                    e.stopPropagation()
                                    addToBAsket(product)}}>add to card</button>
   
                               </div>
                                )
                                ):("no products")
                            }
                           
                           
                        </div>
                    </div>

                </div>


            </section>

        </>
    )
}

export default Customers
