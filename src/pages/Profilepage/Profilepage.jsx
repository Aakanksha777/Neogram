import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Profilepage.css';
import { useEffect } from 'react';
import { AiFillEdit } from 'react-icons/ai'
import Allposts from '../../components/Allposts/Allposts';
import Modal from '../../components/Modal/Modal';
import CreatePost from '../../components/CreatePost/CreatePost';
import EditProfile from '../../components/EditProfile/EditProfile';

const Profilepage = () => {
  const { user } = useContext(AuthContext);
  const [usersPosts, setUserPosts] = useState([])
  const [showProfileEdit, setShowProfileEdit] = useState(false)
  const profileInfo = {
    username: user.username,
    bio: user.bio,
    github_Url: user.github_Url,
    portfolio_url: user.portfolio_url || "",
    image: user.image,
  }
  useEffect(() => {
    fetch(`/api/posts/user/${user.username}`, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setUserPosts(data.posts)
        }
      })
      .catch(e => console.log("Error is ", e))
  }, [])
  const handleClose = () => {
    setShowProfileEdit(false)
  }

  return (
    <div className='profile-page'>
      <div className="profile-container">
        <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
        <h1>{user.firstName} {user.lastName} <i>@{user.username}</i></h1>
        <p>{user.bio}</p>
        <p>Edit Profile: <AiFillEdit onClick={() => setShowProfileEdit(true)} /></p>
        <p>Followers: {user.followers.length}</p>

        <p>GitHub: <a href={user.github_Url} target="_blank" rel="noopener noreferrer">{user.github_Url}</a></p>
      </div>
      <div className="user-posts">
        <Allposts allPosts={usersPosts} />
      </div>
      {showProfileEdit && <Modal onClose={handleClose}>
        <EditProfile profileInfo={profileInfo} onClose={handleClose} />
      </Modal>}
    </div>
  )
}

export default Profilepage
