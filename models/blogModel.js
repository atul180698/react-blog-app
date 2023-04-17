import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'category',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
},
    {
        timestamps: true
    }
)

export default mongoose.model('blog', blogSchema)