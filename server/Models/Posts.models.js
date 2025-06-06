import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: "user"
    },
    prompt: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // Tham chiếu đến model User
      },
    ],
}, { timestamps: true })

const Post = mongoose.models.post || mongoose.model('post', postSchema)

export default Post