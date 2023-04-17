import express from 'express'
import dotenv from 'dotenv'
import connectToMongo from './db.js'
import colors from 'colors'
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

//Connect to Database
connectToMongo()

//esmodule fix
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//configure env
dotenv.config()

//rest object
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, './frontend/dist')))

//Routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/blog", blogRoutes)

//Rest api
app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, './frontend/dist/index.html'))
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Blog app listening on port ${PORT}`.bgBlue.white)
})