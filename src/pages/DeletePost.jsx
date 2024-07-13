
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from 'axios'
import Loader from '../components/loader/Loader'

const DeletePost = ({ postId: id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  //redirect to Login Page for any user who isn't logged In
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, []);


  const removePost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${id}`,{ withCredentials: true, headers: { Authorization: `Bearer ${token}` } });

      if (response.status == 200) {
        if (location.pathname == `/myposts/${currentUser.id}`) {
          navigate(0)
        } else {
          navigate('/')
        }
      }
    } catch (error) {
      console.log("Couldn't Delete Post");
    }finally {
      setTimeout(() => {
        setIsLoading(false); 
      }, 3000);
    }

  }
  if(isLoading){
    return <Loader/>
  }
  return (
    <Link className='btn sm danger' onClick={() => removePost(id)}>Delete</Link>
  )
}

export default DeletePost
