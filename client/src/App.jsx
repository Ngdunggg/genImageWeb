import { useAppContext } from "./context/AppContext";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Profile from "./pages/Profile";
import EditProfile from "./components/EditProfile";
import PostDetail from "./pages/PostDetail";

function App() {
  const { showUserLogin, showEditProfile, user } = useAppContext();

  return (
    <div className="w-screen h-screen flex bg-bg-dark text-text_primary-dark overflow-hidden transition-all">
      <div className="w-full h-full flex flex-col">
        <Navbar />
        {showUserLogin && <Login />}
        {showEditProfile && <EditProfile/>}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostDetail/>} />
            <Route path="/profile/:userId" element={ <Profile/> } />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
