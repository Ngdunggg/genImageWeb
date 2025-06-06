import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Thêm useNavigate
import { useAppContext } from "../context/AppContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ArrowBack, DownloadRounded, FavoriteBorderRounded, FavoriteOutlined } from "@mui/icons-material";
import FileSaver from "file-saver";
import { getPostById, getUserById, toggleLikePost } from "../api";

const PostDetail = () => {
    const { id } = useParams();
    const {user, navigate} = useAppContext()
    const [userInfo, setUserInfo] = useState(null)
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState()
    const [Post, setPost] = useState(null)

    const fetchPost = async () => {
        try {
            const {data} = await getPostById(id)
            if(data.success) {
                setPost(data.data)
            }
        } catch(err) {
            console.log(err.message)
        }
    }

    useEffect(() =>  {
        const fetchInfo = async () =>{
            try {
                if (Post?.userId) {
                    const { data } = await getUserById(Post?.userId)
                    if (data.success) {
                        setUserInfo(data.data)
                    }
                } 
            } catch(err) {
                console.log(err)
            }
        }
        fetchPost()
        fetchInfo()
    }, [Post?.userId])

    useEffect(() => {
        if(user?._id && Post){
            const hasLike =  Post.likes
            if(hasLike.length > 0 && hasLike.includes(user?._id)) {
                setIsLiked(true)
            } else{
                setIsLiked(false)
            }
        }

        if (Post) {
            setLikeCount(Post?.likes.length)
        }

    }, [Post?.likes])

    const handleLike = async () => {
        // setIsLiked(!isLiked);
        console.log(Post?._id)
        try {
            const {data} = await toggleLikePost(Post?._id)
            if(data.success){
                setIsLiked(!isLiked)
                setLikeCount(data.totalLikes)
            }
        } catch (err) {
            console.log(err)
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen text-white">
            <button
                onClick={handleBack}
                className="absolute top-20 left-4 flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-colors duration-200 focus:outline-none"
            >
                <ArrowBack className="w-6 h-6" />
            </button>

            <div className="max-w-[1000px] w-full py-10 px-5 mt-20 pb-20 mx-auto">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <button onClick={() => navigate(`/profile/${Post?.userId}`)}>
                            <img
                                src={userInfo?.avatar || "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"}
                                alt="tác giả"
                                className="w-20 h-20 rounded-full border-2 border-white/50 hover:border-white transition-colors duration-200"
                            />
                        </button>
                        <p className="text-xl font-bold">{userInfo?.name || Post?.name}</p>
                        •
                        <p className="text-sm text-gray-400">{new Date(Post?.createdAt).toLocaleDateString()}</p>
                    </div>

                    <LazyLoadImage src={Post?.photo} className="w-full rounded-3xl object-cover" />
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLike}
                            className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-colors duration-200"
                        >
                            {isLiked ? <FavoriteOutlined /> : <FavoriteBorderRounded />}
                            <span>{likeCount ? likeCount :  0}</span>
                        </button>
                        <button onClick={() => FileSaver.saveAs(Post?.photo, "dowload.jpg")} className="flex items-center gap-2 text-green-500 hover:text-green-700 transition-colors duration-200">
                            <DownloadRounded />
                            <span>Download</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-2 text-xl">
                        <p><span className="font-bold">{userInfo?.name || Post?.name}</span> {Post?.prompt}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;