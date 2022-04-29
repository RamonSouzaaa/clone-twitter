import PostService from '../services/posts.service.js'
import dotenv from 'dotenv'
import HandleHttpErrors from '../middlewares/handle-http-errors.js'
import jwt from 'jsonwebtoken'
dotenv.config()

const {
    STATUS_CREATED, 
    STATUS_OK, 
    STATUS_SERVER_ERROR, 
    STATUS_NOT_FOUND,
    TOKEN_KEY
} = process.env

export default {
    async get(req, res){
        try{
            const posts = await new PostService().all()
            if(posts.length > 0){
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
        const { id } = req.params
        try{
            const post = await new PostService().findId(id)
            if(post){
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
            const decoded = jwt.verify(req.headers.authorization, TOKEN_KEY)                
            const data = {
                content: req.body.content,
                user: decoded.user.user
            }
            console.log(data)
            const post = await new PostService().save(data)
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
            if(post.length > 0){
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
    },

    async like(req, res){
        try {
            const { id } = req.params
            const { _id: userId} = req.decoded.user
            const result = await new PostService().like(id, userId)
            res.status(STATUS_OK).json(result)
        }catch(e){
            res.status(e.code || STATUS_SERVER_ERROR).json({
                error: e.message
            })
        }
    },

    async reply(req, res){
        try {
            const { id } = req.params
            const data = {
                content: req.body.content,
                user: req.decoded.user.user
            }
            const result = await new PostService().reply(id, data)
            res.status(STATUS_OK).json(result)
        }catch(e){
            res.status(e.code || STATUS_SERVER_ERROR).json({
                error: e.message
            })
        }
    }
}