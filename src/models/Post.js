import mongoose from 'mongoose'

export default mongoose.model('Post', {
    content: String,
    user: String,
    create_date: Date,
    visible: Boolean
})

