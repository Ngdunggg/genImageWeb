import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AddRounded, ExploreRounded, MenuOpenRounded, Person2Rounded } from "@mui/icons-material";
import { useAppContext } from "../context/AppContext";
import { logoutUser } from "../api";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/')
  const [open, setOpen] = useState(false)
  const {setShowUserLogin, user, setUser, fetchUser} = useAppContext()
  
  const logout = async () => {
    try{
      const {data} = await logoutUser()
      if (data.success) {
        setUser(null)
        fetchUser()
        navigate("/")
      }
    }catch(err){
      console.log(err.message)
    }
  }

  return (
    <div className="flex w-full items-center justify-between px-6 md:px-12 lg:px-16 xl:px-24 py-3 bg-bgLight-dark border-b border-b-bg-dark text-text_primary-dark font-semibold text-base md:text-lg shadow-lg transition-all duration-300">
      <NavLink to="/" className="hover:text-dark-primary transition-colors duration-200">
        <p className="text-base font-bold md:text-2xl lg:text-3xl">GenImageAI</p>
      </NavLink>
      <div className="hidden sm:flex items-center gap-8">
        { path[1] === 'post' ? (
          <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 cursor-pointer py-1.5 sm:px-2 md:px-4 md:py-2 bg-primary text-text_primary-dark rounded-full hover:bg-primary/70 transition-all duration-200"
          >
              <ExploreRounded style={{ fontSize: "18px" }} />
              <p>Explore Posts</p>
          </button>
        ) : (
          <div className="flex gap-4">
            <button
                onClick={() => navigate("/post")}
                className="flex items-center gap-2 cursor-pointer py-1.5 sm:px-2 md:px-4 md:py-2 bg-cyan-500 text-text_primary-dark rounded-full hover:bg-cyan-500/25 transition-all duration-200"
            >
                <AddRounded style={{ fontSize: "18px" }} />
                <p>Create new post</p>
            </button>
            { !user  ?  (
              <button 
                    onClick={() => {
                        setOpen(false);
                        setShowUserLogin(true);
                    }}
                    className="flex items-center gap-2 cursor-pointer py-1.5 sm:px-2 md:px-4 md:py-2 bg-primary text-text_primary-dark rounded-full hover:bg-primary/70 transition-all duration-200">
                    Login
                </button>
            ) : (
              <div className="relative group">
                <button onClick={() => navigate(`/profile/${user._id}`)} className="flex items-center justify-center w-11 h-11 rounded-full">
                  {user?.avatar ? (
                    <img src={user?.avatar} alt="tác giả" className="w-11 h-11 rounded-full" />
                  ) : (
                    <Person2Rounded style={{fontSize: "35px"}}/>
                  )}
                </button>
                <ul className="hidden group-hover:block absolute top-11 right-0 bg-bgLight-dark shadow border border-bgLight-dark py-2.5 w-28 rounded-md text-base z-40 ">
                  <li onClick={() => navigate(`/profile/${user._id}`)} className="p-1.5 pl-3 cursor-pointer">My Profile</li>
                  <li onClick={logout} className="p-1.5 pl-3 cursor-pointer">Logout</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="flex items-center sm:hidden">
        <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu">
          <MenuOpenRounded style={{fontSize: "30px"}}/>
        </button>
      </div>
      
      {/* Mobile Menu */}
        { open && (
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[55px] left-0 w-full bg-bgLight-dark shadow-md py-4 flex-col items-start gap-3 px-5 text-sm md:hidden`}>
                <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                <NavLink to="/post" onClick={() => setOpen(false)}>Create Post</NavLink>
                { user &&  <NavLink to="/profile" onClick={() => setOpen(false)}>My Profile</NavLink> }
                { !user  ?  (
                    <button 
                        onClick={() => {
                            setOpen(false);
                            setShowUserLogin(true);
                        }}
                        className="flex items-center gap-2 cursor-pointer py-2 px-5 bg-primary text-text_primary-dark rounded-full hover:bg-primary/70 transition-all duration-200">
                        Login
                    </button>
                ) : (
                    <button onClick={logout} className="flex items-center gap-2 cursor-pointer py-2 px-5 bg-primary text-text_primary-dark rounded-full hover:bg-primary/70 transition-all duration-200">
                        Logout
                    </button>
                )}
                
            </div>
        )}

    </div>
  );
};

export default Navbar;