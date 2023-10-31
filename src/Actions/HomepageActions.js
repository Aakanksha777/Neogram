import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";

export const HomepageAction = () => {
  const [getFollowedUser, setGetFollowedUser] = useState([]);
  const [filterArray, setFilterArray] = useState([]);

  const { user } = useContext(AuthContext);
  const { allPosts } = useContext(PostContext);

  useEffect(() => {
    const userAndFollowings = user?.following?.map(
      (person) => person?.username
    );
    userAndFollowings?.push(user.username); //push current logged in user

    const updateArray = allPosts?.filter((post) =>
      userAndFollowings?.some((username) => username === post?.username)
    );
    setGetFollowedUser(updateArray);
    setFilterArray(updateArray);
  }, [allPosts, user]);

  const handleTrending = () => {
    const trendingArry = getFollowedUser.sort(
      (a, b) => b.likes.likeCount - a.likes.likeCount
    );
    console.log(trendingArry);
    setFilterArray([...trendingArry]);
  };

  const handleLatestPosts = () => {
    const getFollowedUser = [...filterArray];
    const latestArry = getFollowedUser.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    console.log(latestArry);
    setFilterArray([...latestArry]);
  };

  return {
    filterArray,
    handleTrending,
    handleLatestPosts,
    setFilterArray,
  };
};
