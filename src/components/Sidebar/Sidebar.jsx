import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const Sidebar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [filteredUser, setFilteredUser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data.users);
      });
  }, []);

  const handleFollowers = (ele) => {
    const url = `/api/users/${ele.isFollowed ? "unfollow" : "follow"}/${
      ele._id
    }`;
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
        setUser({ ...user, ...data.user });
        toast.success(ele.isFollowed ? "unfollowed" : "followed");
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
  }, [allUsers, user]);

  const handleInputValue = (e) => {
    setQuery(e.target.value);
  };

  const newArray = allUsers.filter((ele) =>
    ele.username.toLowerCase().includes(query)
  );

  return (
    <div className="sidebar-container">
      <div className="searchbar">
        <input
          type="text"
          placeholder="search"
          className="search-input"
          onChange={handleInputValue}
          value={query}
        />
        {}

        {newArray.map((user) => (
          <div className="user-mapping" key={user.id}>
            <div className="user-profile-pic1">
              <img alt="user" src={user.image} className="followings-pic" />
            </div>
            <div className="user-bio1">
              <p>{user.firstname}</p>
              <p>
                @{user.username}_{user.lastName}
              </p>
            </div>
            {user.isFollowed ? (
              <div className="user-follow-btn1">
                <button onClick={() => handleFollowers(user)}>Unfollow</button>
              </div>
            ) : (
              <div className="user-follow-btn1">
                <button onClick={() => handleFollowers(user)}>Follow</button>
              </div>
            )}
            <hr />
          </div>
        ))}
      </div>

      {/* <div className="user-container1">
        {filteredUser.map((ele) => (
          <div className="user-mapping" key={ele._id}>
            <div className="user-profile-pic1">
              <img alt="user" src={ele.image} className="followings-pic" />
            </div>
            <div className="user-bio1">
              <p>{ele.firstname}</p>
              <p>
                @{ele.username}_{ele.lastName}
              </p>
            </div>
            {ele.isFollowed ? (
              <div className="user-follow-btn1">
                <button onClick={() => handleFollowers(ele)}>Unfollow</button>
              </div>
            ) : (
              <div className="user-follow-btn1">
                <button onClick={() => handleFollowers(ele)}>Follow</button>
              </div>
            )}
            <hr />
          </div>
        ))}
      </div> */}
      <ToastContainer />
    </div>
  );
};

export default Sidebar;
