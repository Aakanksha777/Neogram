import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [filteredUser, setFilteredUser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data.users);
      });
  }, []);

  const handleFollowers = (ele, isUnfollow = false) => {
    const url = `/api/users/${isUnfollow ? "unfollow" : "follow"}/${ele._id}`;
    fetch(url, {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: user.token,
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("following", data);
        setUser(data.user);
      })
      .catch((e) => console.log("Error is ", e));
  };

  useEffect(() => {
    const userAndFollowings = user.following?.map((person) => person.username); //kon -2 following hai.map , username nikal rhi hu.
    const filteredUser = allUsers.filter(
      (ele) => ele.username !== user.username
    ); // sb user mein se khud ko remove kr rhi hu
    const usersToBeFollowed = filteredUser?.map((otheruser) => {
      otheruser.isFollowed = false;
      if (
        userAndFollowings?.some((username) => username === otheruser?.username)
      ) {
        otheruser.isFollowed = true;
      }
      return otheruser;
    });
    setFilteredUser(usersToBeFollowed);
    console.log("usersToBeFollowed", usersToBeFollowed);
  }, [allUsers, user]);

  return (
    <div className="user-container1">
      {filteredUser.map((ele) => (
        <div className="user-mapping" key={ele._id}>
          <div className="user-profile-pic1">
            <img
              alt="user"
              src={ele.image}
              style={{ width: "12%", borderRadius: "50%" }}
            />
          </div>
          <div className="user-bio1">
            <p>{ele.firstname}</p>
            <p>
              @{ele.username}_{ele.lastName}
            </p>
          </div>
          {!ele.isFollowed ? (
            <div className="user-follow-btn1">
              <button onClick={() => handleFollowers(ele, ele.isFollowed)}>
                Follow
              </button>
            </div>
          ) : (
            <div className="user-follow-btn1">
              <button onClick={() => handleFollowers(ele, ele.isFollowed)}>
                Unfollow
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
