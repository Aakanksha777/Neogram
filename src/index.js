import React from "react";
import "./index.css";
import App from "./App";
// Auth0
import { Auth0Provider } from "@auth0/auth0-react";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { PostProvider, PostContext } from "./context/PostContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { createRoot } from "react-dom/client";

// Call make Server
makeServer();
export { PostContext };
export { AuthContext };

//domain & clientId
const domain = process.env.REACT_APP_AUTH_DOMAIN
const clientId = process.env.REACT_APP_AUTH_CLIENT_ID


const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
  <BrowserRouter>
    <PostProvider>
      <AuthProvider>
        <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
        <App />
        </Auth0Provider>
      </AuthProvider>
    </PostProvider>
  </BrowserRouter>
);
