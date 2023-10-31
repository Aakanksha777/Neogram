import React, { useState, useContext, useEffect } from "react";
import "./Homepage.css";
import PostForm from "../../components/PostForm/PostForm";
import Allposts from "../../components/Allposts/Allposts";
import { HomepageAction } from "../../Actions/HomepageActions";

import { AuthContext } from "../../context/AuthContext";
import { PostContext } from "../../context/PostContext";

const Homepage = () => {
  const { user } = useContext(AuthContext);
  const { allPosts } = useContext(PostContext);

  const { filterArray, handleTrending, handleLatestPosts, setFilterArray } =
    HomepageAction();

  useEffect(() => {
    const userAndFollowings = user?.following?.map(
      (person) => person?.username
    );
    console.log("userAndFollowings", userAndFollowings);
    userAndFollowings?.push(user.username); //push current logged in user

    console.log("userAndFollowings after pushing username", userAndFollowings);

    //only display those post who is in userAndFollowings array.
    const updateArray = allPosts?.filter((post) =>
      userAndFollowings?.some((username) => username === post?.username)
    );

    // 1. iterate each post in Allposts.
    // 2. with the condition -> userAndFollowings having different user
    // 3. if user is found , show only those post having userAndFollowings
    setFilterArray(updateArray);
  }, [user]);

  return (
    <div className="homepage">
      <PostForm />
      <div className="filter-btns">
        <b className="filter-text">Filters</b>
        <button onClick={() => handleTrending()}>Trending</button>
        <button onClick={() => handleLatestPosts()}>Latest</button>
      </div>
      <Allposts allPosts={filterArray} />
    </div>
  );
};

export default Homepage;
