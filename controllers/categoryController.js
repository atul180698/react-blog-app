import categoryModel from '../models/categoryModel.js'
import slugify from 'slugify'

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.send({
                message: "Name is required"
            })
        }

        const existingUser = await categoryModel.findOne({ name })
        if (existingUser) {
            return res.send({
                success: false,
                message: "Category already exists"
            })
        }

        const category = await new categoryModel({ name, slug: slugify(name.toLowerCase()) }).save()
        res.status(201).send({
            success: true,
            message: "New category created",
            category
        })

    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Error in category",
            error
        })
    }
}

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name.toLowerCase()) }, { new: true })
        res.send({
            success: true,
            message: "Category updated successfully",
            category
        })

    } catch (error) {
        console.log(error)
        res.send({
            success: "false",
            message: "Error while updating category",
            error
        })
    }
}

export const allCategoriesController = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.send({
            success: true,
            message: "All categories list",
            category
        })
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Error in getting categories",
            error
        })
    }
}

export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.send({
            success: true,
            message: "Sigle category fetched",
            category
        })

    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Error in getting category",
            error
        })
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        const category = await categoryModel.findByIdAndDelete(id)
        res.send({
            success: true,
            message: "Category deleted"
        })

    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Error in deleting category",
            error
        })
    }
}
