import React, { useEffect, useState } from "react"
import { useAppContext } from "../context/AppContext"
import { getPostByUserId, getPosts, getUserById } from "../api"
import ImageCart from "../components/ImageCart"
import { EditRounded } from "@mui/icons-material"
import { useParams } from "react-router-dom"
import Masonry from "react-masonry-css";

const Profile = () => {
    const { user, setShowEditProfile, navigate } = useAppContext()
    const [data, setData] = useState([])
    const [userProfile, setUserProfile] = useState(null)
    const { userId } = useParams()
    const [totalLike, setTotalLike] = useState()

    // Cấu hình số cột dựa trên kích thước màn hình
    const breakpointColumnsObj = {
        default: 4, // 4 cột trên màn hình lớn (lg)
        1024: 3, // 3 cột trên màn hình trung (md)
        768: 2, // 2 cột trên màn hình nhỏ (sm)
        640: 1, // 1 cột trên màn hình rất nhỏ (mobile)
    };

    useEffect(() => {
        const getData = async () => {
            console.log(user?._id)
            console.log(userId)
            if (!userId && !user?._id) {
                return
            }

            if (!userId || userId === user?._id) {
                setUserProfile(user)
            } else {
                try {
                    const { data } = await getUserById(userId)
                    if (data.success) {
                        setUserProfile(data.data)
                    } else {
                        setUserProfile(null)
                    }
                } catch (err) {
                    console.log(err.message)
                    setUserProfile(null)
                }
            }

            try {
                const res = await getPostByUserId(userId || user?._id)
                const data = res.data
                if (data.success) {
                    setData(data.data)
                } else {
                    setData([])
                }
            } catch (err) {
                console.log(err)
                setData([])
            }
        }
        

        getData()
    }, [user?._id, userId])

    useEffect(() => {
        const getTotalLike = () => {
            let sum = 0
            data.map((item) => {
                sum += item.likes.length
            })
            setTotalLike(sum)
        }
        getTotalLike()
    }, [data])

    return (
        <div className="flex flex-col items-center py-20 gap-10 pb-20">
            <div className="flex flex-1 items-center max-w-[1200px] w-full px-[0px] md:px-[100px] lg:px-[150px] gap-[100px] pb-10 border-b">
                <img src={userProfile?.avatar || "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"} alt="tác giả" className="w-[150px] h-[150px] rounded-full" />

                <div className="flex flex-1 flex-col py-2 gap-2 text-lg">
                    <div className="flex gap-20">
                        <p className="text-xl">{userProfile?.name}</p>
                        {userId === user?._id && (
                            <button onClick={() => setShowEditProfile(true)} className="bg-zinc-700 w-fit px-4 py-1 items-center rounded-full">
                                <EditRounded style={{ fontSize: "20px" }} />
                                Edit profile
                            </button>
                        )}
                    </div>
                    <div className="flex mt-2 gap-20">
                        <p>{data.length > 0 ? data.length : 0}<span className="text-gray-500"> post</span></p>
                        <p>{totalLike}<span className="text-gray-500"> like</span></p>
                    </div>
                    <div className="flex flex-col mt-2">
                        <p>{userProfile?.name}</p>
                        <div className="rounded-full mt-1 w-fit px-3 py-1 w- bg-zinc-700">
                            <p>{userProfile?.email}</p>
                        </div>
                    </div>
                    {userProfile?.bio && (
                        <div>
                            <p>Bio</p>
                            <p>{userProfile?.bio}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-1 flex-col max-w-[1200px] w-full px-5">
                <h2 className="text-2xl font-bold text-text_primary-dark mb-5">My Posts</h2>
                {data.length > 0 ? (
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="flex w-full -mx-2" // Điều chỉnh margin để căn chỉnh
                        columnClassName="px-2" // Padding cho mỗi cột
                    >
                        {data.map((item) => (
                            <div onClick={() => navigate(`/post/${item._id}`)} key={item._id} className="mb-4 break-inside-avoid">
                                <ImageCart item={item} />
                            </div>
                        ))}
                    </Masonry>
                ) : (
                    <div className="text-sm md:text-xl text-gray-400">Không tìm thấy bài viết</div>
                )}
            </div>
        </div>
    )
}

export default Profile