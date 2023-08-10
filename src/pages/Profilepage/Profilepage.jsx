import React, { useContext, useState } from 'react'
import './Profilepage.css'
import Wrapper from '../../components/Wrapper/Wrapper';
import { AuthContext } from '../../context/AuthContext';

const Profilepage = () => {

  const { user } = useContext(AuthContext);
  const [editdata, setEditdata] = useState(user.username);

  // useEffect(() => {
  //   fetch("/api/users/:userId")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log("user from api", data)
  //   })
  //   .catch(e => console.log("Error is ", e))
  // }, []);

  const handleEditUser = () => {
    const encodedToken = localStorage.getItem("token");

    fetch("/api/users/edit", {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: encodedToken
      },
      body: JSON.stringify({ username: editdata })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("edited data", data)
        setEditdata(data)
      })
      .catch(e => console.log("Error is ", e)
      )
  }

  return (
    <div>
      <Wrapper children={
        <>
          <div className='user-container'>
            <div className="user-profile-container">
              <img alt="profile" src='https://fastly.picsum.photos/id/1012/150/150.jpg?hmac=TMFzV0LA0dsm0SmOd_oqZUH4hZjd_fnFAQTFtV0U32U' className="user-profile" />
            </div>

            <div className="user-bio">
              <div className="uername">
                <input value={editdata} name='editUsername' />
                <p>@{user.username}{user.lastName}</p>
                <hr />
              </div>

              <div className="userLink">
                <h4>{user.bio}</h4>
                <p>{user.github_Url}</p>
              </div>



              <div className="followers">
                <p>{user.following}following</p>
                <p>{user.followers} followers</p>
              </div>

            </div>

            <div className="user-edit">
              <button onClick={handleEditUser}>Edit</button>
            </div>
          </div>
        </>
      } />
    </div>

  )
}

export default Profilepage
