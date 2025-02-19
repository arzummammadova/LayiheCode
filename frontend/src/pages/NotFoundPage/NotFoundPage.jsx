import React from 'react'
import notfound from '../../assets/images/notfound.png'
import './notfound.scss'
import { Link } from 'react-router-dom'
const NotFoundPage = () => {
  return (
    <div>
      <div className="notfound-container">
         <h1>404/</h1>
      <p className='f-text'>Oops! Looks like you're lost.</p>
      <img src={notfound} alt="" /> 
      <p>Sometimes getting lost leads to the best stories.</p>
      <Link to='/' className="mainbtn fbtn">Back to home</Link>
      </div>

   
    

    </div>
  )
}

export default NotFoundPage
