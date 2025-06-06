import User from "../Models/User.models.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary } from 'cloudinary' 

export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body
        if (!name || !email || !password) {
            return res.json({success: false, message: "Missing Detail"})
        }

        const existingUser = await User.findOne({email})

        if (existingUser) {
            return res.json({success: false, message: "User already exists"})
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({name, email, password: hashPassword})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})

        res.cookie('token', token, {
            httpOnly: true,  // Ngăn Javascript truy cập vào cookie
            secure: process.env.NODE_ENV === "production",  // sử dụng secure cookie trong sản xuất
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7*24*60*60*1000,  // thời hạn của cookie  
        })

        return res.json({ success: true, user: {email: user.email, name: user.name}})
    } catch(err) {
        console.log(err.message)
        res.json({success: false, message: err.message})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body

        if (!email || !password) {
            return res.json({success: false, message: "Missing email or password"})
        }

        const user = await User.findOne({email})

        if (!user) {
            return res.json({success: false, message: "User not found"})
        }   
        
        if (!bcrypt.compareSync(password, user.password)){
            return res.json({success: false, message: "Email or password invalid"})
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '7d'})
        res.cookie('token', token, {
            httpOnly: true,  // Ngăn Javascript truy cập vào cookie
            secure: process.env.NODE_ENV === "production",  // sử dụng secure cookie trong sản xuất
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7*24*60*60*1000,  // thời hạn của cookie  
        })

        res.json({success: true, user: {email: user.email, name: user.name}})
    } catch(err) {
        console.log(err.message)
        res.json({success: false, message: err.message})
    }
}

export const isAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        return res.json({success: true, user})
    } catch (err) {
        console.log(err.message)
        res.json({success: false, message: err.message})
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true
        })
        return res.json({success: true, message: "Logged Out"})
    } catch (err) {
        console.log(err.message)
        res.json({success: false, message: err.message})
    }
}

export const getUserById = async (req, res) => {
    try {
        const {id} = req.query
        const user = await User.findById(id).select("-password")
        return res.json({success: true, data: user})
    } catch(err){
        console.log(err.message)
        res.json({success: false, message: err.message})
    }
}

export const updateProfile = async (req, res)=>{
    try {
        // let data = req.
        const {name, bio} = req.body
        const userId = req.userId

        const user = await User.findById(userId)
        if (!user) {
            return res.json({success: false, message: "User not found"})
        }

        user.name = name || user.name
        user.bio = bio || user.bio

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'image'
            })
            user.avatar = result.secure_url
        }

        await user.save()

        return res.json({success: true, data: user})
    } catch (err) {
        console.log(err)
        res.json({success: false, message: err.message})
    }
}