import React from "react";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { PostProvider, postContext } from "./context/PostContext";
import { AuthProvider, authContext } from "./context/AuthContext";
import { userContext , UserProvider } from './context/UserContext';
import { createRoot } from 'react-dom/client';

// Call make Server
makeServer();
export {postContext };
export { authContext };
export { userContext };



const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
  <BrowserRouter>
  <PostProvider>
   <AuthProvider>
    <UserProvider>
  <App />
    </UserProvider>
   </AuthProvider>
  </PostProvider>
  </BrowserRouter>
);
