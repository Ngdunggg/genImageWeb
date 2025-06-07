import React from "react";
import { useAppContext } from "../context/AppContext";
import { CloseRounded } from "@mui/icons-material";

const ListUserLiked = () => {

    const {setShowListLike, userLiked, navigate} = useAppContext();

    return (
        <div onClick={() => setShowListLike(false)} className="fixed top-0 bottom-0 right-0 left-0 z-30 flex items-center bg-black/50">
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-6 m-auto items-start p-8 py-12 w-80 sm:w-[352px] md:w-[552px] lg:w-[800px] max-h-[500px] h-full rounded-2xl shadow-xl border border-bgLight-dark bg-bgLight-dark">
                <div className="flex w-full justify-between items-center">
                    <h2 className="text-xl font-medium text-white">Likes</h2>
                    <button onClick={() => setShowListLike(false)} className="bg-gray-600 hover:bg-gray-700 rounded-full p-1 transition-colors duration-200">
                        <CloseRounded style={{ fontSize: "30px", color: "white" }} />
                    </button>
                </div>
                {userLiked.length > 0 ? (
                    <div className="flex flex-col w-full gap-5 overflow-y-auto">
                        {userLiked.map((user) => (
                            <div className="flex items-center gap-6" key={user?._id}>
                                <button onClick={() => {setShowListLike(false); navigate(`/profile/${user?._id}`)}}>
                                    <img src={user?.avatar} className="w-12 h-12 rounded-full"/>
                                </button>
                                {user?.name}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-1 w-full justify-center text-gray-500">No likes yet</div>
                )}
            </div>
        </div>
    )
}

export default ListUserLiked