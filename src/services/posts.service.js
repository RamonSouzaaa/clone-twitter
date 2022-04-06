import Post from '../models/Post.js'

class PostService {
    async save(data){
        const post = new Post({
            content: data.content,
            user: data.user,
            create_date: data.date,
            visible: data.visible
        })
        return await post.save()
    }

    async all(){
        return await Post.find({})
    }
}

export default PostService