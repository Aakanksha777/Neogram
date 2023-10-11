import React, { useContext, useState } from "react";
import {
  AiFillLike,
  AiOutlineLike,
  AiFillDelete,
  AiFillEdit,
} from "react-icons/ai";
import { BsFillBookmarkCheckFill, BsBookmarkDash } from "react-icons/bs";
import { AuthContext } from "../../context/AuthContext";
import { PostContext } from "../../context/PostContext";
import Modal from "../Modal/Modal";
import PostForm from "../PostForm/PostForm";
import "./Allposts.css";

const Allposts = ({ allPosts }) => {
  const { user, setUser } = useContext(AuthContext);
  const { setAllPosts } = useContext(PostContext);
  const [showEditPost, setShowEditPost] = useState(false);
  const [editPostData, setEditPostData] = useState({
    content: "",
    image: "",
  });

  const handleClose = () => {
    setShowEditPost(false);
  };
  // /api/users/bookmark/:postId
  // /api/users/remove-bookmark/:postId

  const handleBookmark = (item, isBookmarked) => {
    debugger;
    const url = `/api/users/${isBookmarked ? "remove-bookmark" : "bookmark"}/${
      item._id
    }`;

    // Create the request payload based on whether it's bookmarking or removing bookmark
    const requestBody = isBookmarked
      ? { action: "remove-bookmark" }
      : { action: "bookmark" };

    fetch(url, {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: user.Token,
      },
      body: JSON.stringify(requestBody), // Send the proper request payload
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setUser({ ...user, bookmarks: data.bookmarks });
        }
      })
      .catch((e) => console.log("Error is ", e));
  };

  // const handleLike = (item, isAlreadyLiked) => {
  //   const url = `/api/posts/${isAlreadyLiked ? "dislike" : "like"}/${item._id}`;
  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //       authorization: user.token,
  //     },
  //     body: JSON.stringify({}),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (!data.errors) {
  //         setAllPosts(data.posts);
  //       }
  //     });
  // };

  const handleLike = (item, isAlreadyLiked) => {
    debugger;
    console.log("item:", item);
    console.log("isAlreadyLiked:", isAlreadyLiked);

    const url = `/api/posts/${isAlreadyLiked ? "dislike" : "like"}/${item._id}`;
    const requestBody = isAlreadyLiked
      ? { action: "dislike" }
      : { action: "like" };

    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: user.token,
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response data:", data);
        if (!data.errors) {
          setAllPosts(data.posts);
        }
      })
      .catch((e) => console.log("Error:", e));
  };

  const handleDelete = (item) => {
    const url = `/api/posts/${item._id}`;
    fetch(url, {
      method: "delete",
      headers: {
        "content-type": "application/json",
        authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setAllPosts(data.posts);
        }
      })
      .catch((e) => console.log("Error is", e));
  };

  return (
    <div>
      {allPosts.length > 0 ? (
        allPosts.map((ele) => (
          <div className="post-container" key={ele._id}>
            <div className="user-time">
              <b>
                {ele.username} -{" "}
                <span className="time">{ele.createdAt} username</span>
              </b>
            </div>
            <img src={ele.image} alt="posts" className="children-post-image" />
            <p>{ele.content} content</p>

            <div className="post-like-bookmark">
              {/* Check if the current user has already liked the post */}
              {ele.likes.likedBy.some(
                (person) => person.username === user.username
              ) ? (
                // Display filled like icon if the user has liked the post
                <AiFillLike onClick={() => handleLike(ele, true)} />
              ) : (
                // Display outlined like icon if the user hasn't liked the post
                <AiOutlineLike onClick={() => handleLike(ele, false)} />
              )}
              {/* Check if the post is bookmarked by the current user */}
              {user.bookmarks.some((markedPost) => markedPost.id === ele.id) ? (
                // Display filled bookmark icon if the post is bookmarked
                <BsFillBookmarkCheckFill
                  onClick={() => handleBookmark(ele, true)}
                />
              ) : (
                // Display empty bookmark icon if the post is not bookmarked
                <BsBookmarkDash onClick={() => handleBookmark(ele, false)} />
              )}
              {/* Display delete icon if the current user is the author of the post */}
              {ele.username === user.username && (
                <>
                  <AiFillDelete onClick={() => handleDelete(ele)} />
                  {/* <AiFillEdit onClick={() => handleEditModal(ele)} /> */}
                </>
              )}
            </div>
            <div className="liked-text">
              Liked <AiOutlineLike /> by {ele.likes.likeCount} people
            </div>
          </div>
        ))
      ) : (
        <h2>No posts</h2>
      )}
      {showEditPost && (
        <Modal onClose={handleClose}>
          <PostForm postData={editPostData} onClose={handleClose} />
        </Modal>
      )}
    </div>
  );
};

export default Allposts;
