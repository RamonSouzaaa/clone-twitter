import Post from '../models/Post.js'
import User from '../models/User.js'
import mongoose from 'mongoose'

const { Types: {ObjectId}} = mongoose

class PostService {
    async all(){
        return await Post.find()
    }

    async findId(id){
        return await Post.findOne({
            _id: ObjectId(id)
        })
    }

    async save(data){
        const { user } = data
        const post = new Post(data)
        const result = await post.save()
        await User.findOneAndUpdate({ 
            user: user
        }, 
        {
            $push: {
                posts: result._id
            }
        })
        return result
    }

    async update(post, data){
        return await post.updateOne(data)
    }

    async delete(id){
        return await Post.deleteOne({
            _id: ObjectId(id)
        })
    }
}

export default PostService
