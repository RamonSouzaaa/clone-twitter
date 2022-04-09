import mongoose from 'mongoose'

const { Schema, Types: {ObjectId}} = mongoose

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type:Number,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    location: {
        type: Object,
        required: true
    },
    posts: [{   
        type: ObjectId,
        ref: 'Post'
    }],
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    prolife_pic: {
        type: String,
    },
    birth_date: {
        type: Date,
        required: true
    }
})

export default mongoose.model('User', User)