import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// folders
import "./App.css";
import Homepage from "./pages/Homepage/Homepage";
import Explorepage from "./pages/Explorepage/Explorepage";
import Bookmarkpage from "./pages/Bookmarkpage/Bookmarkpage";
import Profilepage from "./pages/Profilepage/Profilepage";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Wrapper from "./components/Wrapper/Wrapper";
import RequireAuth from "./components/RequireAuth";

function App() {
  const [isLoggedin, setIsLoggedin] = useState(true);

  return (
    <div className="App-container">
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Wrapper />}>
            <Route path="/home" element={<Homepage />} />
            <Route path="/explore" element={<Explorepage />} />
            <Route path="/bookmark" element={<Bookmarkpage />} />
            <Route path="/profile" element={<Profilepage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
