import React, { useContext, useEffect, useState } from "react";
import { BiTrendingUp } from "react-icons/bi";
import { PiSortAscendingBold, PiSortAscendingThin } from "react-icons/pi";
import "./Homepage.css";
import Allposts from "../../components/Allposts/Allposts";
import { PostContext } from "../../context/PostContext";
import { AuthContext } from "../../context/AuthContext";
import PostForm from "../../components/PostForm/PostForm";

const Homepage = () => {
  const { user } = useContext(AuthContext);
  const { allPosts } = useContext(PostContext);
  const [getFollowedUser, setGetFollowedUser] = useState([]);
  const [filterArray, setFilterArray] = useState([]);
  const [showIsTrending, setShowIsTrending] = useState(true);
  const [showIsLatest, setShowIsLatest] = useState(true);

  // const handleTrending = (isTrending) => {
  //   if (isTrending) {
  //     setShowIsTrending(false);
  //     const trendingArray = getFollowedUser.sort(
  //       (a, b) => b.likes.likeCount - a.likes.likeCount
  //     );
  //     setFilterArray([...trendingArray]);
  //   } else {
  //     setShowIsTrending(true);
  //     setFilterArray([...getFollowedUser]);
  //   }
  // };

  // const handleLatestPosts = (isLatest) => {
  //   if (isLatest) {
  //     const latestArray = getFollowedUser.sort(
  //       (a, b) => b.createdAt - a.createdAt
  //     );
  //     setFilterArray([...latestArray]);
  //   } else {
  //     setFilterArray([...getFollowedUser]);
  //   }
  // };

  const handleTrending = () => {
    const trendingArray = getFollowedUser
      .slice()
      .sort((a, b) => b.likes.likeCount - a.likes.likeCount);
    console.log("trendingArray", [...trendingArray]);
    setFilterArray([...trendingArray]);
  };

  const handleLatestPosts = () => {
    const latestArray = getFollowedUser
      .slice()
      .sort((a, b) => b.createdAt - a.createdAt);
    console.log("latestArray", [...latestArray]);
    setFilterArray([...latestArray]);
  };
  useEffect(() => {
    const userAndFollowings = user?.following?.map(
      (person) => person?.username
    );
    userAndFollowings?.push(user.username); //push username

    const updateArray = allPosts?.filter((post) =>
      userAndFollowings?.some((username) => username === post?.username)
    );
    setGetFollowedUser(updateArray);
    setFilterArray(updateArray);
  }, [allPosts, user]);

  // userAndFollowings = ["kajal", "rahul", "aakanksha"];
  // ele.username = post.username [kajal || rahul || aakanksha || adarsh_balika]
  // ? check whether exist or not.

  return (
    <div className="homepage">
      <PostForm />
      <div className="filter-btns">
        <b className="filter-text">Filters</b>
        <button onClick={() => handleTrending()}>Trending</button>
        <button onClick={() => handleLatestPosts()}>Latest</button>
        {/* <button
          onClick={() => handleLatestPosts(showIsTrending)}
          className="homepage-filter"
        >
          {showIsTrending && <BiTrendingUp />}
        </button> */}

        {/* sorting by latest  */}
        {/* <button
          onClick={() => handleLatestPosts(showIsTrending)}
          className="homepage-filter"
        >
          {showIsLatest && <PiSortAscendingBold />}
        </button> */}
      </div>
      <Allposts allPosts={filterArray} />
    </div>
  );
};

export default Homepage;
