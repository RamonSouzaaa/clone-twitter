import UserService from '../services/users.service.js'
import dotenv from 'dotenv'
import HandleHttpErrors from '../middlewares/handle-http-errors.js'
import bcrypt from 'bcrypt'
dotenv.config()

const {STATUS_CREATED, STATUS_OK, STATUS_ACCETED, STATUS_SERVER_ERROR, STATUS_NOT_FOUND, STATUS_UNAUTHORIZED} = process.env

export default {

    async get(req, res){
        try{
            const users = await new UserService().all()
            if(users !== null){
                res.status(STATUS_OK).json(users)
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
            const user = await new UserService().findId(req.params)
            if(user !== null){
                res.status(STATUS_OK).json(user)
            }else{
                throw new HandleHttpErrors('No data', STATUS_NOT_FOUND);
            }
        }catch(e){
            res.status(e.code || STATUS_SERVER_ERROR).json({
                error: e.message
            })
        }
    },

    async findUser(req, res){
        try{
            const user = await new UserService().find(req.params)
            if(user !== null){
                res.status(STATUS_OK).json(user)
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
            const user = await new UserService().save(req.body)
            res.status(STATUS_CREATED).json(user)
        }catch(e){
            res.status(e.code || STATUS_SERVER_ERROR).json({
                error: e.message
            })
        }
    },

    async put(req, res){
        try{
            const user = await new UserService().findId(req.params)
            if(user !== null){
                const result = await new UserService().update(user, req.body)
                res.status(STATUS_OK).json(result)  
            }else{
                throw new HandleHttpErrors('User not found', STATUS_NOT_FOUND);
            }
        }catch(e){
            res.status(e.code || STATUS_SERVER_ERROR).json({
                error: e.message
            })
        }
    },

    async delete(req, res){
        try{
            const result = await new UserService().delete(req.params)
            res.status(STATUS_OK).json(result)
        }catch(e){
            res.status(e.code || STATUS_SERVER_ERROR).json({
                error: e.message
            })
        }
    },

    async login(req, res){
        const result = await new UserService().find({email: req.body.email})
        if(result.length === 0){
            res.status(STATUS_NOT_FOUND).json({
                error: 'User not found'
            })
        }else if(bcrypt.compareSync(req.body.password, result[0].password)){
            res.status(STATUS_ACCETED).json(result)
        }else{  
            res.status(STATUS_UNAUTHORIZED).json({
                error: 'Password is incorret'
            })
        }
    }
}