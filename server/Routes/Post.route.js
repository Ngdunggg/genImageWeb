import express from 'express'
import { createPost, getAllPost, getPostById, getPostByUserId, toggleLikePost } from '../Controllers/Posts.controller.js'
import authUser from '../Middlewares/auth.js'

const postRouter = express.Router()

postRouter.get('/', getAllPost)
postRouter.post('/', authUser, createPost)
postRouter.get('/getPostByUser/:userId', getPostByUserId)
postRouter.post('/like/:postId', authUser, toggleLikePost)
postRouter.get('/getPost/:postId', getPostById)

export default postRouter