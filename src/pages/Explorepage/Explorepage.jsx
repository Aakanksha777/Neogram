import React, { useContext, useState } from 'react'
// folders 
import Allposts from '../../components/Allposts/Allposts'
import { PostContext } from '../../context/PostContext';

const Explorepage = () => {
  const { allPosts } = useContext(PostContext)
  return (
    <div>
      <h2>Latest Posts</h2>
      <Allposts
        allPosts={allPosts}
      />
    </div>
  )
}

export default Explorepage
