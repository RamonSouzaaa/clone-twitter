import Post from '../models/Post.js'
import User from '../models/User.js'
import mongoose from 'mongoose'

const { Types: {ObjectId}} = mongoose

class PostService {
    all(){
        return Post.find().populate('likes')
    }

    findId(id){
        return Post.findOne({
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

    update(post, data){
        return post.updateOne(data)
    }

    delete(id){
        return Post.deleteOne({
            _id: ObjectId(id)
        })
    }

    like(postId, userId){
        return Post.findByIdAndUpdate(postId, {
            $push: {
                likes: userId
            }
        }).populate('likes')
    }
}

export default PostService
