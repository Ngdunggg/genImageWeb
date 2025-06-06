import React, { useState } from "react";
import GenerateImageForm from "../components/GenerateImageForm";
import GenerateImageCard from "../components/GenerateImageCard";

const CreatePost = () => {

  const [generateImageLoading, setGenerateImageLoading] = useState(false)
  const [createPostLoading, setCreaetePostLoading] = useState(false)
  const [post, setPost] = useState({
    name: "",
    prompt: "",
    photo: "",
  })
  
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-2 md:py-4 lg:py-8 xl:py-16 pb-12">
      <div className="h-fit w-full max-w-[1200px] gap-10 lg:flex justify-center">
        <GenerateImageForm post={post} setPost={setPost} createPostLoading={createPostLoading} setCreatePostLoading={setCreaetePostLoading} generateImageLoading={generateImageLoading} setGenerateImageLoading={setGenerateImageLoading}/>
        <GenerateImageCard src={post?.photo} loading={generateImageLoading}/>
      </div>
    </div>
  );
};

export default CreatePost;