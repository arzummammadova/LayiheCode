import React from 'react'
import Hero from '../components/hero/Hero'
import Banner from '../components/banner/Banner'
import Products from '../components/products/products'
import Customers from '../components/customers/Customers'
import About from '../components/about/About'

const Home = () => {
  return (
    <>
      <Hero/>
      <Banner/>
      <About/>
      <Products/>
      <Customers/>
    </>
  )
}

export default Home
