import {useState , useEffect, useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";


export const HomepageAction  = () => {

  
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
        console.log("trending action is working")
        const trendingArray = getFollowedUser
          .slice()
          .sort((a, b) => b.likes.likeCount - a.likes.likeCount);
        console.log("trendingArray", [...trendingArray]);
        setFilterArray([...trendingArray]);
    };

    const handleLatestPosts = () => {
        console.log("latest action is working")
        const latestArray = getFollowedUser
          .slice()
          .sort((a, b) => b.createdAt - a.createdAt);
        console.log("latestArray", [...latestArray]);
        setFilterArray([...latestArray]);
      };
      
  return {
    handleTrending,
    handleLatestPosts
  };

}
