import Post from '../models/Post.js'

class PostService {
    async all(){
        return await Post.find({})
    }

    async save(data){
        if(this.validateFields(data)){
            const post = new Post(data)
            return await post.save()
        }

    }

    async update(id, newData){
        const post = new Post({
            id : id
        })
        return await post.update(newData)
    }

    validateFields(fields){
        return (
            fields.content !== undefined  &&
            fields.user !== undefined  &&
            fields.create_date !== undefined  &&
            fields.visible !== undefined
        )
    }
}

export default PostService