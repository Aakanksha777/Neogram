import React, { useContext } from "react";
// import { FcLike } from 'react-icons/fc'
// import { BiBookmarkHeart } from 'react-icons/bi'
import { AuthContext } from "../../context/AuthContext";
import Allposts from "../../components/Allposts/Allposts";

const Bookmarkpage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h2>Bookmarked posts</h2>
      <Allposts allPosts={user.bookmarks} />
    </div>
  );
}

export default Bookmarkpage;
