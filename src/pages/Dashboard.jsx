import React, { useState, useContext, useEffect } from 'react'
import { DUMMY_POSTS } from '../data'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from 'axios'
import Loader from '../components/loader/Loader'
import DeletePost from './DeletePost'

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams()

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  //redirect to Login Page for any user who isn't logged In
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])


  useEffect(()=>{
const fetchPosts = async ()=>{
  setIsLoading(true);
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/users/${id}`,
      { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
  setPosts(response.data)
  
  
    } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      setIsLoading(false); 
    }, 3000);
  }
}

fetchPosts();

  },[id])

if(isLoading){
  return <Loader/>
}


  return (
    <section className='dashboard'>
    {posts.length ? (
      <div className='container dashboard__container'>
        {posts.map(post => (
          <article key={post.id} className='dashboard__post'>
            <div className='dashboard__post-info'>
              <div className='dashboard__post-thumbnail'>
              <img src={post.thumbnail} alt={post.title} />
              </div>
              <h5>{post.title}</h5>
            </div>
            <div className='dashboard__post-actions'>
              <Link to={`/posts/${post._id}`} className='btn sm'>View</Link>
              <Link to={`/posts/${post._id}/edit`} className='btn sm primary'>Edit</Link>
              <DeletePost postId={post._id} />
            </div>
          </article>
        ))}
      </div>
    ) : (
      <h2 className='center'>You Have No Posts Yet!</h2>
    )}
  </section>

  )
}

export default Dashboard
