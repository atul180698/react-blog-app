import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

//Protected routes token base
export const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        res.status(401).send({
            sucess: false,
            message: "Please authenticate using a valid token"
        })
    }
}

//Admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if (user.role !== 1) {
            res.status(401).send({
                success: false,
                message: "Unauthorized Access"
            })
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
    }

}