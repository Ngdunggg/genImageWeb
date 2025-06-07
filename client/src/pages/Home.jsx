import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import ImageCart from "../components/ImageCart";
import Masonry from "react-masonry-css";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const { navigate, setSearchTerm, searchTerm, post, fetchUser } = useAppContext();

  // Cấu hình số cột dựa trên kích thước màn hình
  const breakpointColumnsObj = {
    default: 4, // 4 cột trên màn hình lớn (lg)
    1024: 3, // 3 cột trên màn hình trung (md)
    768: 2, // 2 cột trên màn hình nhỏ (sm)
    640: 1, // 1 cột trên màn hình rất nhỏ (mobile)
  };

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className="flex flex-col items-center gap-5 py-2 md:py-4 lg:py-8 xl:py-16 pb-12">
      <div className="text-sm md:text-xl lg:text-2xl xl:text-3xl flex flex-col items-center font-medium text-text_primary-dark">
        Explore popular posts in the Community!
        <span className="font-bold text-primary md:text-xl lg:text-3xl">
          ⦿ Generated with AI ⦿
        </span>
      </div>
      <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

      <div className="w-full max-w-[1400px] py-8 flex justify-center">
        {post.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-full -mx-2" // Điều chỉnh margin để căn chỉnh
            columnClassName="px-2" // Padding cho mỗi cột
          >
            {post.map((item) => (
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
  );
};

export default Home;