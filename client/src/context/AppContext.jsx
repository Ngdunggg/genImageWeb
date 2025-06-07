import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts, createPost, getUserInfo } from "../api";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showListLike, setShowListLike] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const [post, setPost] = useState([]);
  const [userLiked, setUserLiked] = useState([])

  const fetchUser = async () => {
    try {
      const { data } = await getUserInfo()
      if (data.success) {
        setUser(data.user)
      }
    } catch (err) {
      setUser(null)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    const handle = setTimeout(async () => {
      try {
        const res = await getPosts();
        const data = res.data;
        if (data.success) {
          if (searchTerm.trim()) {
            const filterPost = data.data.filter(
              (item) =>
                item.prompt.toLowerCase().includes(searchTerm.toLowerCase())
                // item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setPost(filterPost);
          } else {
            setPost(data.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }, 500);

    return () => clearTimeout(handle);
  }, [searchTerm]);


  const updatePost = (newPost) => {
    setPost((prevPost) => [newPost, ...prevPost]);
  };

  const value = {
    navigate,
    user,
    setUser,
    showUserLogin,
    setShowUserLogin,
    showEditProfile,
    setShowEditProfile,
    searchTerm,
    setSearchTerm,
    post,
    updatePost,
    fetchUser,
    showListLike,
    setShowListLike,
    userLiked,
    setUserLiked
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};