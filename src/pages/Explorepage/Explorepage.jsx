import React, { useContext } from "react";
import "./Explorepage.css";
// folders
import Allposts from "../../components/Allposts/Allposts";
import { PostContext } from "../../context/PostContext";

const Explorepage = () => {
  const { allPosts } = useContext(PostContext);
  return (
    <div>
      <h2>Latest Posts</h2>
      <div className="explore-post">
        <Allposts allPosts={allPosts} />
      </div>
    </div>
  );
};

export default Explorepage;
