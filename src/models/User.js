import mongoose from 'mongoose'

export default mongoose.model('User', {
    name: String,
    age: Number,
    bio: String,
    user: String,
    location: Object,
    posts: Array,
    email: String,
    prolife_pic: String,
    bith_date: String
})