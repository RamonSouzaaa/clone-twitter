import mongoose from 'mongoose'

const { Schema, Types: {ObjectId}} = mongoose

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
        required: true,
        default: new Date()
    },
    visible: {
        type: Boolean,
        required: true,
        default: true
    },
    likes : [{
        type: ObjectId, 
        ref: 'User'
    }],
    replies: [{
        type: ObjectId, 
        ref: 'Post'
    }]
})

export default mongoose.model('Post', Post)

