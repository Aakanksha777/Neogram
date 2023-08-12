import { createContext, useState, useEffect } from "react";

export const postContext = createContext();

export function PostProvider({ children }) {

  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);


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


  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data.users)
      })
  }, [])

  return (
    <postContext.Provider value={{ allPosts, setAllPosts, allUsers }}>
      {children}
    </postContext.Provider>
  )
}
