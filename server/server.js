import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import connectDB from './configs/db.js'
import connectCloudinary from './configs/cloudinary.js'
import postRouter from './Routes/Post.route.js'
import generatedImageRouter from './Routes/GenerateAIImage.route.js'
import userRouter from './Routes/User.route.js'
import cookieParser from 'cookie-parser'

dotenv.config() 

const app = express()

const PORT = process.env.PORT || 5000

app.use(cookieParser())
app.use(cors({origin: "http://localhost:3000", credentials: true}))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({extended: true}))

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || "Something went wrong!"
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.use('/api/post', postRouter)
app.use('/api/generateImage', generatedImageRouter)
app.use('/api/user', userRouter)

app.get('', async (req, res) => {
    res.status(200).json({success: true, message: "Hello world"})
})

const startServer = async () => {
    try {
        await connectDB()
        await connectCloudinary()
        app.listen(PORT, () => {
            console.log(`Start with Port http://localhost/${PORT}`)
        })
    } catch(err) {
        console.log(err)
    }
}

startServer()