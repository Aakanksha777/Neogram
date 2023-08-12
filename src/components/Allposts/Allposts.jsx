import React, { useContext } from 'react'
import { FcLike } from 'react-icons/fc'
import { BiBookmarkHeart } from 'react-icons/bi'
import { AiOutlineLike } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AuthContext } from '../../context/AuthContext';
import { PostContext } from '../../context/PostContext';


const Allposts = ({ allPosts }) => {
  const { user, setUser } = useContext(AuthContext);
  const { setAllPosts } = useContext(PostContext)

  const handleBookmark = (item) => {
    fetch(`/api/users/bookmark/${item._id}`, {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: user.token
      },
      body: JSON.stringify({})
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({ ...user, bookmarks: [...user.bookmarks, data] })
      })
      .catch(e => console.log("Error is ", e))
  }

  const handleLike = (item) => {
    fetch(`/api/posts/like/${item._id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: user.token
      },
      body: JSON.stringify({})
    })
      .then((res) => res.json())
      .then((data) => {
        setAllPosts(data.posts)
      })
  }

  const handleDelete = (item) => {
    fetch(`/api/posts/${item._id}`, {
      method: "delete",
      headers: {
        "content-type": "application/json",
        authorization: user.token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setAllPosts(data)
      })
      .catch(e => console.log("Error is", e))
  }
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
