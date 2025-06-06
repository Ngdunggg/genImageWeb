import { AutoAwesome, CreateRounded } from "@mui/icons-material"
import React from "react"
import { createPost, generateImage } from "../api"
import { useState } from "react"
import { useAppContext } from "../context/AppContext"

const GenerateImageForm = ({post, setPost, createPostLoading, setCreatePostLoading, generateImageLoading, setGenerateImageLoading}) =>{
    const [error, setError] = useState("")
    const {navigate, updatePost, user} = useAppContext()

    const createPostFunction = async () => {
        if (!user) {
            setError("You must be logged in to create a post.");
            return;
        }

        setCreatePostLoading(true);
        try {
        const payload = {
            ...post,
            userId: user._id, // Add userId directly to payload
        };
        const res = await createPost(payload);
            if (res.data.success) {
                const newPost = res.data.data
                updatePost(newPost)
                navigate("/")
                setCreatePostLoading(false)
            }
        } catch(err) {
            setError(err.message)
            setCreatePostLoading(false)
        }
    }
    
    const generateImageFunction = async () => {
        setGenerateImageLoading(true)
        try {
            const res = await generateImage({prompt: post?.prompt})
            if (res.data) {
                setPost({...post, photo: `data:image/jpeg;base64,${res?.data?.photo}`})
                setGenerateImageLoading(false)
            }
        } catch(err) {
            setError(err.message)
            setGenerateImageLoading(false)
        }
    }

    return(
        <div className="flex flex-1 flex-col px-4 py-4 gap-20 justify-center">
            
            <div className="flex flex-col gap-1.5">
                <p className="text-3xl font-medium text-text_primary-dark">Generate Image with prompt</p>
                <p className="text-lg font-normal text-text_secondary-dark">Write your prompt according to the image you want to generate!</p>  
            </div>
            
            
            <div className="flex flex-col gap-4 text-sm font-normal text-text_secondary-dark">
                <div className="text-base gap-2 flex flex-col">
                    <label className="ml-3 uppercase">Auhthor</label>
                    <input className="border rounded-3xl py-3 px-5 outline-none w-full bg-transparent text-base" name="name" value={user?.name} />
                </div>
                
                <div className="text-base gap-2 flex flex-col">
                    <label className="ml-3 uppercase">Image Prompt</label>
                    <textarea rows={8} className="border rounded-3xl py-3 px-5 outline-none w-full bg-transparent text-base" name="prompt" value={post.prompt} onChange={(e) => setPost({...post, prompt: e.target.value})} placeholder="Write a detailed prompt about the image...." />
                </div>
                {error && <div className="text-red-600 text-lg flex justify-center ">{error}</div>}
                <p className="flex justify-center">*** You can post the AI Generate Image to the Community ***</p>
                {!user && <p className="flex text-base text-red-400 justify-center">You need to login or register before an article</p>}
            </div>


            <div className="flex flex-1 justify-around gap-4 py-6 px-4">
                <button
                    className={`flex w-full items-center justify-center gap-2 py-1.5 sm:px-2 md:px-4 md:py-2 text-text_primary-dark rounded-full transition-all duration-200 ${generateImageLoading ||post.prompt === "" ? 'bg-blue-500/50 cursor-not-allowed opacity-70' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'}`}
                    disabled={generateImageLoading || post.prompt === "" }  
                    onClick={generateImageFunction}
                >
                    <AutoAwesome/>
                    <p>Generate Image</p>
                </button>
                <button
                    className={`flex w-full items-center justify-center gap-2 cursor-pointer py-1.5 sm:px-2 md:px-4 md:py-2 text-text_primary-dark rounded-full transition-all duration-200 ${createPostLoading || !user || post.prompt === "" || post.photo === "" ? 'bg-primary/50 cursor-not-allowed opacity-70' : 'bg-primary hover:bg-primary/75 cursor-pointer'} `}
                    disabled={createPostLoading ||!user || post.prompt === "" || post.photo === ""}
                    onClick={createPostFunction}
                >
                    <CreateRounded/>
                    <p>Post Image</p>
                </button>
            </div>
        </div>
    )
}

export default GenerateImageForm