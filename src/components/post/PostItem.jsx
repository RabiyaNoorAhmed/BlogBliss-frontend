
import React from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';

const PostItem = ({ postID, thumbnail, category, title = '', description = '', authorID, createdAt }) => {
    const shortDescription = description.length > 145 ? description.substr(0, 145) + '...' : description;
    const postTitle = title.length > 30 ? title.substr(0, 30) + '...' : title;

    // Assuming thumbnail is already the public URL from Firebase Storage
    const thumbnailUrl = thumbnail;

    return (
        <article className='post'>
            <div className='post__thumbnail'>
            <Link to={`/posts/${postID}`}>
                <img src={thumbnailUrl} alt={title} />
                </Link>
            </div>
            <div className='post__content'>
               
                    <h3>{postTitle}</h3>
               
                <p dangerouslySetInnerHTML={{ __html: shortDescription }} />
                <div className='post__footer'>
                    <PostAuthor authorID={authorID} createdAt={createdAt} />
                    <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
                </div>
            </div>
        </article>
    );
};

export default PostItem;
