import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function () {
            return this.authProvider === 'local' 
        },
        default: null
    },
    avatar: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
    },
    authProvider: {
        type: String,
        enum: ['local', 'discord'],
        default: 'local'
    },
    providerId: {
        type: String,
        default: null
    }
}, {timestamps: true})

const User = mongoose.models.user || mongoose.model('user', userSchema)

export default User