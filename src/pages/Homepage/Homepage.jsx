import React, { useContext, useEffect, useState } from "react";
import { BiTrendingUp } from "react-icons/bi";
import { PiSortAscendingBold } from "react-icons/pi";
import "./Homepage.css";
import CreatePost from "../../components/CreatePost/CreatePost";
import Allposts from "../../components/Allposts/Allposts";
// import { authContext } from "../../context/AuthContext";
import { postContext } from "../../context/PostContext";
import { userContext } from "../../context/UserContext";

const Homepage = () => {
  // const { user } = useContext(authContext);
  const { loggedinuser } = useContext(userContext)
  const { allPosts } = useContext(postContext);
  const [filterArray, setFilterArray ] = useState([]);

  const handleTrending = () => {
    console.log("trending")
    const trendingArray = filterArray.sort((a, b) => b.likes.likeCount - a.likes.likeCount);
    setFilterArray(trendingArray)
    console.log("trendingArray", trendingArray);
  };

  const handleLatestPosts = () => {
    console.log("latest post")
    const latestArray = filterArray.sort((a,b) => b.createdAt - a.createdAt);
    setFilterArray(latestArray);
  }
  console.log("loggedinuser", loggedinuser);

  useEffect(() => {
    const userAndFollowings = loggedinuser?.following?.map((person) => person?.username);
    userAndFollowings?.push(loggedinuser.username); //push username
    console.log("userAndFollowings", userAndFollowings);

    const updateArray = allPosts?.filter((post) =>
    userAndFollowings?.some((username) => username === post?.username)
  );
  console.log("updateArray", updateArray);
    setFilterArray(updateArray)
  }, [allPosts, loggedinuser]);
  
  // userAndFollowings = ["kajal", "rahul", "aakanksha"];
  // ele.username = post.username [kajal || rahul || aakanksha || adarsh_balika]
  // ? check whether exist or not.

  return (
    <div>
      <CreatePost />
      <div className="filter-btns">
        <b>Filters</b>
        <button onClick={handleTrending}>
          <BiTrendingUp />
        </button>
        <button onClick={handleLatestPosts}>
          <PiSortAscendingBold />
        </button>
      </div>

      <Allposts allPosts={filterArray} />
      {/* use useState  */}
    </div>
  );
};

export default Homepage;