import React from 'react'
import LoadingGif from '../../assets/gif/loader1.gif'
const Loader = () => {
  return (
    <div className='loader'>
      <div className='loader__image'>
        <img src={LoadingGif}/>
      </div>
    </div>
  )
}

export default Loader
