import React, { useContext, useState } from 'react'
import './PostForm.css';
import { PostContext } from '../../context/PostContext';
import { AuthContext } from '../../context/AuthContext';

const PostForm = () => {
  const [createdPost, setCreatedPost] = useState({
    content: "",
    image: ""
  });
  const { user } = useContext(AuthContext)
  const { setAllPosts } = useContext(PostContext);

  const handleCreatePost = () => {
    fetch("/api/posts", {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: user.token
      },
      body: JSON.stringify({ postData: createdPost })
    })
      .then((res) => res.json())
      .then((data) => {
        setAllPosts(data.posts)
        setCreatedPost({ content: "", image: "" });
      })
      .catch(e => console.log("Error is ", e));
  }


  const handleTextarea = (e) => {
    setCreatedPost({ ...createdPost, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <h2>Post</h2>
      <div className="post-form-container">
        <div className='post-form-text-btn'>

          <textarea
            className='post-form-textarea'
            placeholder='share your thoughts !'
            onChange={handleTextarea}
            value={createdPost.content}
            name='content' />

          <input
            type='url'
            placeholder='image url'
            onChange={handleTextarea}
            value={createdPost.image}
            name='image'
          />


          <button onClick={handleCreatePost}>Share</button>
        </div>
      </div>
    </div>
  )
}

export default PostForm
