import React, { useContext } from "react";
// import { FcLike } from 'react-icons/fc'
// import { BiBookmarkHeart } from 'react-icons/bi'
// import { PostContext } from '../../context/PostContext'
import { AuthContext } from "../../context/AuthContext";
import Allposts from "../../components/Allposts/Allposts";
import Wrapper from "../../components/Wrapper/Wrapper";

const Bookmarkpage = () => {
  const { bookmarked } = useContext(AuthContext);

  if (Object.keys(bookmarked).length) {
    return (
      <div>
        <h2>Bookmarked posts</h2>
        <Allposts allPosts={bookmarked.bookmarks} />
      </div>
    );
  }
  return <b>No Bookmark</b>
};

export default Bookmarkpage;
