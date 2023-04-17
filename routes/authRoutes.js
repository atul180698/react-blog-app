import express from 'express'
import { registerController, loginController, forgotPasswordController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
const router = express.Router()

//ROUTE 1: Register user || POST Method
router.post("/register", registerController)

//ROUTE 2 : Login User || POST Method
router.post("/login", loginController)

//ROUTE 3 : Forgot Password || POST Method
router.post("/forgot-password", forgotPasswordController)

// //PROTECTED USER ROUTE
// router.get("/user-auth", requireSignIn, (req, res) => {
//     res.send({ ok: true })
// })

// //PROTECTED ADMIN ROUTE
// router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
//     res.send({ ok: true })
// })

export default router