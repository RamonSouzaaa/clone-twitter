import Post from '../models/Post.js'
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
        const post = new Post(data)
        return await post.save()
    }

    async update(post, data){
        return await post.updateOne(data)
    }
}

export default PostService