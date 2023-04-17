import slugify from 'slugify'
import blogModel from '../models/blogModel.js'
import fs from 'fs'

//create blog funtion
export const createBlogController = async (req, res) => {
    try {
        const { title, description, category } = req.fields
        const { image } = req.files
        //validation
        switch (true) {
            case !title:
                return res.send({ message: "Name is required" })
            case !description:
                return res.send({ message: "Description is required" })
            case !image:
                return res.send({ message: "Image is required" })
            case image && image.size > 1000000:
                return res.send({ message: "Image is required and should bes less than 1mb" })
            case !category:
                return res.send({ message: "Category is required" })
        }
        //check existing blog with same title
        const existingBlog = await blogModel.findOne({ slug: slugify(title.toLowerCase()) })
        if (existingBlog) {
            return res.send({
                success: false,
                message: "Please select a different Title Name"
            })
        }
        //create new blog
        const blogs = new blogModel({ ...req.fields, slug: slugify(title.toLowerCase()) })
        if (image) {
            blogs.image.data = fs.readFileSync(image.path)
            blogs.image.contentType = image.type
        }
        //save changes to database
        await blogs.save()
        res.status(201).send({
            success: true,
            message: "Blog created successfully",
            blogs
        })
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Error in creating blog",
            error
        })
    }
}

//update blog function
export const updateBlogController = async (req, res) => {
    try {
        const { title, description, category } = req.fields
        const { image } = req.files
        //validation
        switch (true) {
            case !title:
                return res.send({ message: "Name is required" })
            case !description:
                return res.send({ message: "Description is required" })
            case !category:
                return res.send({ message: "Category is required" })
            case image && image.size > 1000000:
                return res.send({ message: "Image is required and should bes less than 1mb" })
        }
        //find and update blog on the basis of id
        const blogs = await blogModel.findByIdAndUpdate(req.params.bid, { ...req.fields, slug: slugify(title.toLowerCase()) }, { new: true })
        if (image) {
            blogs.image.data = fs.readFileSync(image.path)
            blogs.image.contentType = image.type
        }
        //save changes to database
        await blogs.save()
        res.send({
            success: true,
            message: "Blog updated successfully",
            blogs
        })
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Error while updating blog",
            error
        })
    }
}

//get blogs funtion
export const getBlogController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).select("-image").populate("category").limit(12).sort({ createdAt: -1 })
        res.send({
            success: true,
            blogCount: blogs.length,
            message: "All Blogs",
            blogs
        })
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Error while getting blogs",
            error
        })
    }
}

//get single blog function
export const getSingleBlogController = async (req, res) => {
    try {
        const blog = await blogModel.findOne({ slug: req.params.slug }).select("-image").populate("category")
        res.send({
            success: true,
            message: "Blog Fetched",
            blog
        })
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Error while getting blog",
            error
        })
    }
}

//get blog photo function
export const blogPhotoController = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.bid).select("image")
        if (blog.image.data) {
            res.set("Content-type", blog.image.contentType)
            return res.send(blog.image.data)
        }
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Error while getting Photo",
            error
        })
    }
}

//delete blog function
export const deleteBlogController = async (req, res) => {
    try {
        await blogModel.findByIdAndDelete(req.params.bid).select("-image")
        res.send({
            success: true,
            message: "Blog deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Error while deleting Blog",
            error
        })
    }
}