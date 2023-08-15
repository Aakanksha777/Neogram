import { createContext, useState, useEffect } from "react";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        let arr = data.posts
        arr.map((obj) => {
          obj.bookmarked = false
          return arr;
        })
        setAllPosts(arr)
      })
      .catch((e) => console.error(e))
  }, []);

  return (
    <PostContext.Provider value={{ allPosts, setAllPosts }}>
      {children}
    </PostContext.Provider>
  )
}
