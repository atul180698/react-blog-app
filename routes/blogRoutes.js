import express from 'express'
import { createBlogController, deleteBlogController, getBlogController, getSingleBlogController, blogPhotoController, updateBlogController } from '../controllers/blogController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import formidable from 'express-formidable'
const router = express.Router()

//routes
//create blog
router.post('/create-blog', requireSignIn, formidable(), createBlogController)

//update blog
router.put('/update-blog/:bid', requireSignIn, formidable(), updateBlogController)

//get blogs
router.get('/get-blog', getBlogController)

//get single blog
router.get('/get-blog/:slug', getSingleBlogController)

//get blog photo
router.get('/blog-photo/:bid', blogPhotoController)

//delete blog
router.delete('/delete-blog/:bid', deleteBlogController)

export default router