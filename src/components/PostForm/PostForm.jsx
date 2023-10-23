import React, { useContext, useState } from "react";

// files
import "./PostForm.css";

// context
import { PostContext } from "../../context/PostContext";
import { AuthContext } from "../../context/AuthContext";

// main-function
const PostForm = ({ postData, onClose }) => {
  // useState for Creating Post
  // postData ????
  const [createdPost, setCreatedPost] = useState(
    postData || {
      content: "",
      image: "",
    }
  );
  // getting USER && Allposts
  const { user } = useContext(AuthContext);
  const { setAllPosts } = useContext(PostContext);

  // form submit function
  const handlePostSubmit = (e) => {
    e.preventDefault();
    const url = `/api/posts${postData ? "/edit/" + postData._id : ""}`;
    fetch(url, {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: user.token,
      },
      body: JSON.stringify({ postData: createdPost }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAllPosts(data.posts);
        setCreatedPost({ content: "", image: "" });
        onClose && onClose();
      })
      .catch((e) => console.log("Error is ", e));
  };

  const handleTextarea = (e) => {
    setCreatedPost({ ...createdPost, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="post-form-container">
        <form className="post-form-text-btn " onSubmit={handlePostSubmit}>
          <textarea
            className="bg-color post-textarea"
            placeholder="share your thoughts !"
            onChange={handleTextarea}
            value={createdPost.content}
            name="content"
          />

          <input
            className="bg-color post-input"
            type="url"
            placeholder="image url"
            onChange={handleTextarea}
            value={createdPost.image}
            name="image"
          />
          <button className="post-form-btn">Share</button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
