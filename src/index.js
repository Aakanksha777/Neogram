import React from "react";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { PostProvider, postContext } from "./context/PostContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { createRoot } from "react-dom/client";

// Call make Server
makeServer();
export { postContext };
export { AuthContext };

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
  <BrowserRouter>
    <PostProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PostProvider>
  </BrowserRouter>
);
