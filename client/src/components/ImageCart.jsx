import { DownloadRounded } from "@mui/icons-material";
import FileSaver from "file-saver";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAppContext } from "../context/AppContext";
import { getUserById } from "../api";

const ImageCart = ({ item }) => {
    const { navigate } = useAppContext()
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                if (item.userId) {
                    const { data } = await getUserById(item.userId);
                    if (data.success) {
                        setUser(data.data);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchInfo();
    }, [item.userId]);

    return (
        <div className="relative rounded-3xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:-translate-y-2 group">
            <LazyLoadImage
                src={item?.photo}
                alt={item?.prompt}
                className="w-full h-auto object-cover rounded-3xl transition-transform duration-300"
                wrapperClassName="w-full"
            />
            <div className="absolute inset-0 flex flex-col items-start gap-3 backdrop-blur-sm bg-gradient-to-t from-black/70 to-transparent text-text_primary-dark transition-opacity justify-end rounded-2xl p-4 opacity-0 group-hover:opacity-100">
                <div className="flex w-full justify-between">
                    <div className="w-full flex items-center gap-3">
                        <button onClick={(e) => { e.stopPropagation(); navigate(`/profile/${item?.userId}`) }}>
                            <img
                                src={
                                    user?.avatar ||
                                    "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                                }
                                alt="tác giả"
                                className="w-10 h-10 rounded-full border-2 border-white/50 hover:border-white transition-colors duration-200"
                            />
                        </button>
                        <div className="font-normal">
                            <p className="text-base">{user?.name || item?.name}</p>
                            <p className="text-sm text-gray-200">{new Date(item?.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Ngăn sự kiện click navigate khi tải xuống
                            FileSaver.saveAs(item?.photo, "download.jpg");
                        }}
                        className="p-2 w-10 h-10 bg-white/20 rounded-full hover:bg-white/40 transition-colors duration-200"
                    >
                        <DownloadRounded className="text-white" />
                    </button>
                </div>
                <p className="font-medium text-base">{item?.prompt}</p>
            </div>
        </div>
    );
};

export default ImageCart;