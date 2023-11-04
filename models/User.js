import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String, 
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }]
    },
    {
        timestamps: true
    }
)

export default mongoose.model('User', UserSchema)