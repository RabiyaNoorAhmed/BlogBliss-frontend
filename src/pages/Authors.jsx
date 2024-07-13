import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Loader from '../components/loader/Loader'
import UserAvatar from '../assets/images/user.png'


const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const defaultAvatar = UserAvatar;


  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`);
        setAuthors(response.data)
      } catch (error) {
        console.log(error);
      }
      finally {
        setTimeout(() => {
          setIsLoading(false); 
        }, 3000);
      }
    }
    getAuthors();
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <section className='authors'>
      {authors.length > 0 ? <div className='container authors__container'>
        {
          authors.map(({ _id: id, avatar, name, posts }) => {
            return <Link key={id} to={`/posts/users/${id}`} className='author'>
              <div className='author__avatar'>
                <img
                  src={avatar ? `${import.meta.env.VITE_ASSETS_URL}/uploads/${avatar}` : defaultAvatar}
                  alt={`Image of ${name}`}
                />

              </div>
              <div className='author__info'>
                <h4>{name}</h4>
                <p>{posts}</p>
              </div>
            </Link>
          })
        }
      </div> : <h2 className='center'>No Users/Authors Found.</h2>}
    </section>
  )
}

export default Authors
