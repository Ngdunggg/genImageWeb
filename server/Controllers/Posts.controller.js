import Post from "../Models/Posts.models.js"
import * as dotenv from 'dotenv'
import { createError } from "../error.js"
import {v2 as cloudinary} from 'cloudinary'

export const getAllPost = async (req, res, next) => {
    try {
        const posts = await Post.find({})
        const result = posts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
        return res.status(200).json({success: true, data: result})
    } catch(err) {
        next(createError(err.status, err?.response?.data?.error?.message || err?.message ))
    }
}

export const getPostByUserId = async (req, res, next) => {
    try {
        const {userId} = req.params
        const posts =  await Post.find({userId})
        const result = posts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
        return res.status(200).json({success: true, data: result})
    } catch(err){
        next(createError(err.status, err?.response?.data?.error?.message || err?.message ))
    }
}

export const createPost = async (req, res, next) => {
    try {
        const {prompt, photo} = req.body

        const photoUrl = await cloudinary.uploader.upload(photo, {resource_type: 'image'})
        const newPost = await Post.create({
            userId: req.userId, 
            prompt,
            photo: photoUrl.secure_url
        })
        return res.status(201).json({success: true, data: newPost})
    } catch(err) {
        next(createError(err.status, err?.response?.data?.error?.message || err?.message ))
    }
}

export const toggleLikePost = async (req, res) =>  {
    try {
        const {postId} = req.params
        const post = await Post.findById(postId)

        if (!post) {
            return res.json({success: false, message: "Post is not found"})
        }
        const hasLike = post.likes.includes(req.userId)

        if (hasLike) {
            post.likes.pull(req.userId)
        } else {
            post.likes.push(req.userId)
        }

        await post.save()

        return res.json({success: true, totalLikes: post.likes.length, likes: post.likes })

    } catch (err){
        console.log(err.message)
        res.json({success: false, message: err.message})
    }
}

export const getPostById = async (req, res) => {
    try {
        const {postId} = req.params
        
        const post = await Post.findById(postId)
      
        return res.json({success: true, data: post})
    } catch (err){
        console.log(err)
        res.json({success: false, message: err.message})
    }
}