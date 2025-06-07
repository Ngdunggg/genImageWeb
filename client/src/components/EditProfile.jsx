import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { CloseRounded } from "@mui/icons-material";
import { updateProfile } from "../api";

const EditProfile = () => {
    const { setShowEditProfile, user, setUser } = useAppContext();
    const [name, setName] = useState(user?.name || "");
    const [bio, setBio] = useState(user?.bio || ""); 
    const [avatar, setAvatar] = useState(user?.avatar || "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"); // State cho ảnh đại diện
    const [avatarFile, setAvatarFile] = useState(null); 

    const onSubmitHandle = async (event) => {
        event.preventDefault(); // Ngăn form submit mặc định
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("bio", bio);
            if (avatarFile) {
                formData.append("avatar", avatarFile);
            }
            // Gọi API để cập nhật profile, ví dụ:
            const {data} = await updateProfile(formData)
            if(data.success) {
                setUser(data.data)
                setShowEditProfile(false);
            }
            setShowEditProfile(false); 
        } catch (err) {
            console.log(err.message);
        }
    };

    const ChangePhoto = (e) => {
        const file = e.target.files[0]; 
        if (file) {
            setAvatarFile(file); 
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result); 
            };
            reader.readAsDataURL(file); // Chuyển file thành Data URL để preview
        }
    };

    return (
        <div onClick={() => setShowEditProfile(false)} className="fixed top-0 bottom-0 right-0 left-0 z-30 flex items-center bg-black/50">
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-6 m-auto items-start p-8 py-12 w-80 sm:w-[352px] md:w-[552px] lg:w-[800px] rounded-2xl shadow-xl border border-bgLight-dark bg-bgLight-dark">
                <div className="flex w-full justify-between items-center">
                    <h2 className="text-xl font-medium text-white">Edit profile</h2>
                    <button onClick={() => setShowEditProfile(false)} className="bg-gray-600 hover:bg-gray-700 rounded-full p-1 transition-colors duration-200">
                        <CloseRounded style={{ fontSize: "30px", color: "white" }} />
                    </button>
                </div>

                <div className="flex w-full gap-6 bg-zinc-800 px-5 py-4 rounded-xl items-center">
                    <img src={avatar} alt="Ảnh đại diện" className="w-[70px] h-[70px] rounded-full object-cover border-2 border-gray-500"/>
                    <div className="flex-1">
                        <p className="text-white">{user?.name || "Tên"}</p>
                        <p className="text-gray-400">{user?.email || "email@example.com"}</p>
                    </div>  
                    <label className="cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={ChangePhoto}
                            className="hidden"
                        />
                        <span className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-xl font-medium text-white transition-colors duration-200">
                            Change photo
                        </span>
                    </label>
                </div>

                <div className="flex flex-col w-full gap-2">
                    <h2 className="text-white">Name</h2>
                    <input
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-bgLight-dark border border-gray-400 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col w-full gap-2">
                    <h2 className="text-white">Bio</h2>
                    <textarea
                        rows={4}
                        maxLength={150}
                        placeholder="Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="bg-bgLight-dark border border-gray-400 rounded-lg px-3 py-2 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-gray-400 text-sm">{bio.length}/150</p>
                </div>

                <div className="flex w-full items-center justify-center">
                    <button onClick={onSubmitHandle} className="bg-blue-600 hover:bg-blue-700 px-32 py-3 rounded-2xl text-white font-medium transition-colors duration-200">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;