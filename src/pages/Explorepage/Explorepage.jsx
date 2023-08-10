import React, { useContext, useState } from 'react'
// folders 
import Allposts from '../../components/Allposts/Allposts'
import { postContext } from '../../context/PostContext';
import { AuthContext } from '../../context/AuthContext';


const Explorepage = () => {

  const { allPosts, setAllPosts } = useContext(postContext)
  const { setBookmarked } = useContext(AuthContext);

  const [likes, setLikes] = useState(0)

  const handleBookmark = (item) => {
    const encodedToken = localStorage.getItem("token")
    fetch(`/api/users/bookmark/${item._id}`, {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: encodedToken
      },
      body: JSON.stringify({})
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("explore data", data)
        setBookmarked(data)
      })
      .catch(e => console.log("Error is ", e))
  }

  const handleLike = (item) => {
    console.log("item", item._id)
    const encodedToken = localStorage.getItem("token")
    fetch(`/api/posts/like/${item._id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: encodedToken
      },
      body: JSON.stringify({})
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("like post", data)
        setAllPosts(data.posts)
        // console.log("likeCount",data.posts.likes.likeCount)
        // setLikes(data.posts.likes.likeCount)

      })
  }

  const handleDelete = (item) => {
    console.log("deleted item")
    const encodedToken = localStorage.getItem("token");
    fetch(`/api/posts/${item._id}`, {
      method: "delete",
      headers: {
        "content-type": "application/json",
        authorization: encodedToken
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
