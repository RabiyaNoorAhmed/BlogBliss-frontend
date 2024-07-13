import React, { useContext, useEffect, useState } from 'react'
import PostAuthor from '../components/post/PostAuthor'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import Loader from '../components/loader/Loader'
import DeletePost from './DeletePost'
import axios from 'axios'
const PostDetail = () => {

  const {id} = useParams()
  const [post, setPost] = useState(null)
  // const [creatorID, setCreatorID] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        setError(error);
      }finally {
        setTimeout(() => {
          setIsLoading(false); 
        }, 3000);
      }
    }
    getPost();
  }, [])



  if (isLoading) {
    return <Loader />
  }

  return (
    <section className='post-detail'>
      {error && <p className='error'>{error}</p>}
      {post && <div className='container post-detail__container'>
        <div className='post-detail__header'>
          <PostAuthor authorID={post.creator} createdAt={post.createdAt}/>
          {currentUser?.id == post?.creator && <div className='post-detail__buttons'>
            <Link to={`/posts/${post._id}/edit`} className='btn sm primary'>Edit</Link>
            <DeletePost postId={id}/>
          </div>}
        </div>
        <h1>{post.title}</h1>
        <div className='post-detail__thumbnail'>
          <img src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${post.thumbnail}`} alt='' />

        </div>
<p dangerouslySetInnerHTML={{__html: post.description}}></p>
      </div>}
    </section>
  )
}

export default PostDetail
