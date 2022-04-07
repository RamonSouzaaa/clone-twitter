import Post from '../models/Post.js'

class PostService {
    async all(){
        return await Post.find()
    }

    async save(data){
        const post = new Post(data)
        return await post.save()
    }
}

export default PostService