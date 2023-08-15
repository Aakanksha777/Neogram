import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Profilepage.css';
import { useEffect } from 'react';
import { AiFillEdit } from 'react-icons/ai'
import Allposts from '../../components/Allposts/Allposts';

const Profilepage = () => {
  const { user } = useContext(AuthContext);
  const [usersPosts, setUserPosts] = useState([])

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

  const handleEditUser = () => {
    fetch("/api/users/edit", {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: user.token
      },
      body: JSON.stringify()
    })
      .then((res) => res.json())
      .then((data) => {

      })
      .catch(e => console.log("Error is ", e))
  }

  return (
    <div className='profile-page'>
      <div className="profile-container">
        <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
        <h1>{user.firstName} {user.lastName}</h1>
        <p>{user.bio}</p>
        <p>Edit Profile: <AiFillEdit /></p>
        <p>Followers: {user.followers.length}</p>

        <p>GitHub: <a href={user.github_Url} target="_blank" rel="noopener noreferrer">{user.github_Url}</a></p>
      </div>
      <div class="user-posts">
        <Allposts allPosts={usersPosts} />
      </div>
    </div>
  )
}

export default Profilepage
