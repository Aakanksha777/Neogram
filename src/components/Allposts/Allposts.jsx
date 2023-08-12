import React from 'react'
import { FcLike } from 'react-icons/fc'
import { BiBookmarkHeart } from 'react-icons/bi'
import { AiOutlineLike } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs';


const Allposts = ({ allPosts, handleBookmark, handleLike, handleDelete }) => {
  return (
    <div className="children-posts">
      {allPosts.length > 0 ? allPosts.map((ele) => (
        <div className='post-container' key={ele._id}>
          <div className="user-time">
            <b className='user-time'>{ele.username} -  <span className='time'>{ele.createdAt}</span></b>
          </div>
          <img src={ele.image} alt='posts' className='children-post-image' />
          <p>{ele.content}</p>
          <div className='post-like-bookmark'>
            <FcLike onClick={() => handleLike(ele)} />
            <BiBookmarkHeart onClick={() => handleBookmark(ele)} />
            <BsThreeDotsVertical onClick={() => handleDelete(ele)} />
          </div>
          <div className='liked-text'>Liked <AiOutlineLike /> by {ele.likes.likeCount} people</div>
        </div>
      ))
        :
        <h2>No posts</h2>}
    </div>
  )
}

export default Allposts
