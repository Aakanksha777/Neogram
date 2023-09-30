import { Routes, Route } from "react-router-dom";

// folders
import "./App.css";
import Homepage from "./pages/Homepage/Homepage";
import Explorepage from "./pages/Explorepage/Explorepage";
import Bookmarkpage from "./pages/Bookmarkpage/Bookmarkpage";
import Profilepage from "./pages/Profilepage/Profilepage";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Wrapper from "./components/Wrapper/Wrapper";
import Topbar from "./components/Topbar/Topbar";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {

const navigate = useNavigate();
const {setUser } = useContext(AuthContext)

  const handleLogout = () => {
    localStorage.removeItem("encodedToken");
    localStorage.removeItem("user"); 
    setUser(null); 
    navigate('/login')
    
  }
  return (
    <div className="App">
      {/* <div className="topbar-box">
      <Topbar />
      </div> */}
      <button onClick={handleLogout}>Logout</button>
      <Routes>
        {/* checking login for these routes. This logic is written inside Wrapper component*/}
        <Route path="/" element={<Wrapper />}>
          <Route path="home" element={<Homepage />} />
          <Route path="explore" element={<Explorepage />} />
          <Route path="bookmark" element={<Bookmarkpage />} />
          <Route path="profile" element={<Profilepage />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

//1. imported top bar globally.
//2. route tag opening and closing , wrap all the app components.
//3. wrapper path will be '/'.
//4. login path '/login' && signup path '/register'.