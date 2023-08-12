import React, { useContext, useState } from 'react'
// folders 
import Allposts from '../../components/Allposts/Allposts'
import { postContext } from '../../context/PostContext';
import { AuthContext } from '../../context/AuthContext';


const Explorepage = () => {
  const [bookmark, setBookmarked] = useState([])
  const { allPosts, setAllPosts } = useContext(postContext)
  const { user } = useContext(AuthContext);

  const [likes, setLikes] = useState(0)

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
        setBookmarked(data)
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
        console.log("deleting", data.posts)
        setAllPosts(data)
      })
      .catch(e => console.log("Error is", e))
  }

  return (
    <div>



      <h2>Latest Posts</h2>
      <Allposts
        allPosts={allPosts}
        handleBookmark={handleBookmark}
        handleLike={handleLike}
        handleDelete={handleDelete}
      />

      <b>{likes}</b>

    </div>
  )
}

export default Explorepage
