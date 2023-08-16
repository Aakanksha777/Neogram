import React, { useContext, useState } from 'react'
import { AiFillLike, AiOutlineLike, AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { BsFillBookmarkCheckFill, BsBookmarkDash } from 'react-icons/bs'
import { AuthContext } from '../../context/AuthContext';
import { PostContext } from '../../context/PostContext';
import Modal from '../Modal/Modal';
import PostForm from '../PostForm/PostForm';


const Allposts = ({ allPosts }) => {
  const { user, setUser } = useContext(AuthContext);
  const { setAllPosts } = useContext(PostContext)
  const [showEditPost, setShowEditPost] = useState(false)

  const handleClose = () => {
    setShowEditPost(false)
  }
  const handleBookmark = (item, isBookmarked) => {
    const url = `/api/users/${isBookmarked ? "remove-bookmark" : "bookmark"}/${item._id}`
    fetch(url, {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: user.token
      },
      body: JSON.stringify({})
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setUser({ ...user, bookmarks: data.bookmarks })
        }
      })
      .catch(e => console.log("Error is ", e))
  }
  const handleEdit = (item) => {
    const url = `/api/posts/edit/${item._id}`
    fetch(url, {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: user.token
      },
      body: JSON.stringify({})
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setUser({ ...user, })
        }
      })
      .catch(e => console.log("Error is ", e))
  }

  const handleLike = (item, isAlreadyLiked) => {
    const url = `/api/posts/${isAlreadyLiked ? "dislike" : "like"}/${item._id}`
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: user.token
      },
      body: JSON.stringify({})
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setAllPosts(data.posts)
        }
      })
  }

  const handleDelete = (item) => {
    const url = `/api/posts/${item._id}`
    fetch(url, {
      method: "delete",
      headers: {
        "content-type": "application/json",
        authorization: user.token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setAllPosts(data.posts)
        }
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
            {ele.likes.likedBy.some((person) => person.username === user.username) ? <AiFillLike onClick={() => handleLike(ele, true)} /> : <AiOutlineLike onClick={() => handleLike(ele, false)} />}
            {user.bookmarks.some((markedPost) => markedPost.id === ele.id) ? <BsFillBookmarkCheckFill onClick={() => handleBookmark(ele, true)} /> : <BsBookmarkDash onClick={() => handleBookmark(ele, false)} />}
            {ele.username === user.username &&
              <>
                <AiFillDelete onClick={() => handleDelete(ele)} />
                <AiFillEdit onClick={() => { }} />
              </>}
          </div>
          <div className='liked-text'>Liked <AiOutlineLike /> by {ele.likes.likeCount} people</div>
        </div>
      ))
        :
        <h2>No posts</h2>}
      {showEditPost && <Modal onClose={handleClose}>
        <PostForm onClose={handleClose} />
      </Modal>}
    </div>
  )
}

export default Allposts
