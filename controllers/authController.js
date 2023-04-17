import userModel from "../models/userModel.js"
import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import jwt from 'jsonwebtoken'

//Register
export const registerController = async (req, res) => {
    try {
        const { name, email, password, answer } = req.body
        //validations
        if (!name || !email || !password || !answer) {
            return res.send({ message: "Please fill all the fields" })
        }
        //check existing user
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            res.send({
                success: false,
                message: "User already exists! Please Login"
            })
        }
        //Register user
        const encryptPassword = await hashPassword(password)
        //save
        const user = await new userModel({ name, email, password: encryptPassword, answer }).save()
        res.status(201).send({
            success: true,
            message: "User registered successfully!",
            user
        })
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Error in Registration",
            error
        })
    }
}

//Login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.send({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.send({
                success: false,
                message: "User not registered"
            })
        }

        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.send({
                success: false,
                message: "Invalid Password"
            })
        }
        //JWT Token create
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
        res.send({
            success: true,
            message: "Login Successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Error in Login",
            error
        })
    }
}

//forgot password controller
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body
        if (!email) {
            return res.send({ message: "Email is Required" })
        }
        if (!answer) {
            return res.send({ message: "Answer is Required" })
        }
        if (!newPassword) {
            return res.send({ message: "New password is Required" })
        }
        const user = await userModel.findOne({ email, answer })
        if (!email) {
            res.send({
                success: false,
                message: "Wrong email or answer"
            })
        }

        const newHashPassword = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: newHashPassword })
        res.send({
            success: true,
            message: "Password reset successfully"
        })

    } catch (error) {
        console.log(error)
        res.send({
            sucess: false,
            message: "Something went wrong",
            error
        })
    }
}

