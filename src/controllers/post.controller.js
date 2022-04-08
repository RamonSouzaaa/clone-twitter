import PostService from '../services/posts.service.js'
import dotenv from 'dotenv'
import HandleHttpErrors from '../middlewares/handle-http-errors.js'
dotenv.config()

const {STATUS_CREATED, STATUS_OK, STATUS_SERVER_ERROR, STATUS_NOT_FOUND} = process.env

export default {
    async get(req, res){
        try{
            const posts = await new PostService().all()
            if(posts !== null){
                res.status(STATUS_OK).json(posts)
            }else{
                throw new HandleHttpErrors('No data', STATUS_NOT_FOUND);
            }
        }catch(e){
            res.status(e.code || STATUS_SERVER_ERROR).json({
                error: e.message
            })
        }
    },

    async findId(req, res){
        try{
            const post = await new PostService().findId(req.params)
            if(posts !== null){
                res.status(STATUS_OK).json(post)
            }else{
                throw new HandleHttpErrors('No data', STATUS_NOT_FOUND);
            }
        }catch(e){
            res.status(e.code || STATUS_SERVER_ERROR).json({
                error: e.message
            })
        }
    },

    async post(req, res){
        try{
            const post = await new PostService().save(req.body)
            res.status(STATUS_CREATED).json(post)
        }catch(e){
            res.status(e.code || STATUS_SERVER_ERROR).json({
                error: e.message
            })
        }
    },

    async put(req, res){
        try{
            const post = await new PostService().findId(req.params)
            if(post !== null){
                const result = await new PostService().update(post, req.body)
                res.status(STATUS_OK).json(result)
            }else{
                throw new HandleHttpErrors('Post not found', STATUS_NOT_FOUND);
            }
        }catch(e){
            res.status(e.code || STATUS_SERVER_ERROR).json({
                error: e.message
            })
        }
    },

    async delete(req, res){
        try{
            const result = await new PostService().delete(req.params)
            res.status(STATUS_OK).json(result)
        }catch(e){
            res.status(e.code || STATUS_SERVER_ERROR).json({
                error: e.message
            })
        }
    }
}