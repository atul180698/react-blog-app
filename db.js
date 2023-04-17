import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'

dotenv.config()
const mongoURI = process.env.MONGO_URI

//Function to establish connection with mongoDB server
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log("Connected to mongoDB successfully".bgGreen.black)
    } catch (error) {
        console.error(error)
    }
}

export default connectToMongo