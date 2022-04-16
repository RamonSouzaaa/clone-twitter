import Post from '../models/Post.js'
import User from '../models/User.js'
import mongoose from 'mongoose'

const { Types: {ObjectId}} = mongoose

class PostService {
    all(){
        return Post.aggregate([
            {
                $project: {
                    _id: true,
                    content: true,
                    user: true,
                    create_date: true,
                    likes: {
                        $size: "$likes"
                    },
                    replies: {
                        $size: "$replies"
                    }
                }
            }
        ])
            
    }

    findId(id){
        return Post.findById(id).populate(['likes', 'replies'])
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
        }).populate(['likes', 'replies'])
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
        }).populate(['likes', 'replies'])
    }

    async reply(postId, data){
        const postReply = await Post.create(data)
        return Post.findByIdAndUpdate(postId, {
            $push: {
                replies: postReply._id
            }
        }).populate(['likes', 'replies'])
    }
}

export default PostService
