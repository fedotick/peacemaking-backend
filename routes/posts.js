import { Router } from "express"
import { checkAuth } from "../utils/checkAuth.js"
import { createPost, deletePost, getAll, getById, getMyPosts, getPostComments, updatePost } from "../controllers/posts.js"

const router = new Router()

// Create post
router.post('/', checkAuth, createPost)

// Get All Posts
router.get('/', getAll)

// Get By Id
router.get('/:id', getById)

// Get My Posts
router.get('/user/me', checkAuth, getMyPosts)

// Remove Post
router.delete('/:id', checkAuth, deletePost)

// Update Post
router.put('/:id', checkAuth, updatePost)

// Get Post Comments
router.get('/comments/:id', getPostComments)

export default router