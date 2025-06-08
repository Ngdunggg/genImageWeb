import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import connectDB from './configs/db.js'
import connectCloudinary from './configs/cloudinary.js'
import postRouter from './Routes/Post.route.js'
import generatedImageRouter from './Routes/GenerateAIImage.route.js'
import userRouter from './Routes/User.route.js'
import cookieParser from 'cookie-parser'
import './strategies/discord_strategy.js'
import passport from 'passport'
import session from 'express-session'

dotenv.config() 

const app = express()

const PORT = process.env.PORT || 5000

const allowOrigins = ["http://localhost:3000", "https://gen-image-web.vercel.app"]

app.use(cookieParser("secret"))
app.use(cors({origin: allowOrigins, credentials: true}))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: "dungDepTrai",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000*60*24,
        secure: false,
        httpOnly: true,
    }
}))
app.use(passport.initialize())
app.use(passport.session())

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