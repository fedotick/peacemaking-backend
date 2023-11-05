import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import commentRoute from './routes/comment.js'

const app = express()
dotenv.config()

// Constants
const PORT = process.env.PORT || 7000
const MONGODB_URL = process.env.MONGODB_URL

// Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

// Routes
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)

async function start() {
    try {
        await mongoose.connect(MONGODB_URL)

        app.listen(PORT, () => {
            console.log(`Server started on port: ${7777}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()

