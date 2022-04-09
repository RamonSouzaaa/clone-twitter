import mongoose from 'mongoose'

const { Schema } = mongoose

const Post = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        required: true
    },
    visible: {
        type: Boolean,
        required: true
    }
})

export default mongoose.model('Post', Post)

