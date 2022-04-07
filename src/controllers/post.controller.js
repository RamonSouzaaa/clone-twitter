import PostService from '../services/posts.service.js'
import dotenv from 'dotenv'
dotenv.config()

const {STATUS_CREATED, STATUS_OK, STATUS_SERVER_ERROR} = process.env

export default {
    async get(req, res){
        const posts = await new PostService().all()
        res.status(STATUS_OK).json(posts)
    },

    async post(req, res){
        const post = await new PostService().save(req.body)
        res.status(STATUS_CREATED).json(post)
    },

    async put(req, res){
        const post = await new PostService().findId(req.params)
        const result = await new PostService().update(post, req.body)
        res.status(STATUS_OK).json(result)
    }
}