import express from 'express'
import authUser from '../Middlewares/auth.js'
import { getUserById, isAuth, login, logout, register, updateProfile } from '../Controllers/User.controller.js'
import { upload } from '../configs/multer.js'

const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/isAuth', authUser, isAuth)
userRouter.get('/logout', authUser, logout)
userRouter.get('/getUser', getUserById)
userRouter.put('/updateProfile', upload.single('avatar'), authUser, updateProfile)

export default userRouter