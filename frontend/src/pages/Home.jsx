import React from 'react'
import Hero from '../components/hero/Hero'
import Banner from '../components/banner/Banner'
import Products from '../components/products/products'
import Customers from '../components/customers/Customers'
import About from '../components/about/About'
import Books from '../components/books/Books'
import Caraousel from '../components/caraousel/Caraousel'
import Recomendation from '../components/recomendation/Recomendation'
import Legendary from '../components/legendary/Legendary'
import Delivery from '../components/delivery/Delivery'

const Home = () => {
  return (
    <>
      <Hero/>
      {/* <Banner/> */}
      {/* <About/> */}
      <Books/>
      <Caraousel/>
      <Recomendation/>
      <Legendary/>
      {/* <Products/> */}
      <Delivery/>
      {/* <Customers/> */}
    </>
  )
}

export default Home
