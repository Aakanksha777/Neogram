import { Routes, Route} from "react-router-dom";

// pages folders
import "./App.css";
import Homepage from "./pages/Homepage/Homepage";
import Explorepage from "./pages/Explorepage/Explorepage";
import Bookmarkpage from "./pages/Bookmarkpage/Bookmarkpage";
import Profilepage from "./pages/Profilepage/Profilepage";

//component files
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Wrapper from "./components/Wrapper/Wrapper";

//Actions
// import { useLogout } from "./Actions/useLogout";

//main-component
function App() {

  return (
    <div className="App">
      
      <Routes>
        {/* checking login for these routes. This logic is written inside Wrapper component*/}
        {/* This will work only when USER exist. else navigate to Login page. */}
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

