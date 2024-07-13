import React from 'react'
import { Link } from 'react-router-dom'
import ErrorImg from '../assets/images/error.png'
const Error = () => {
  return (
    <section className='error-page'>
      <div className='center'>
        <img src={ErrorImg} alt='error' className='error-img' />
        <Link to='/' className='btn primary'>
          Go Back Home
        </Link>
        <h2>Page Not Found</h2>
      </div>
    </section>
  )
}

export default Error
