import UserService from '../services/users.service.js'
import dotenv from 'dotenv'
import HandleHttpErrors from '../middlewares/handle-http-errors.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import moment from 'moment'

dotenv.config()

const {
    STATUS_CREATED, 
    STATUS_OK, 
    STATUS_ACCETED, 
    STATUS_SERVER_ERROR,
    STATUS_NOT_FOUND, 
    STATUS_UNAUTHORIZED,
    TOKEN_KEY
} = process.env

const createToken = (payload) => {
    return jwt.sign({
        iat: moment().unix(),
        exp: moment().add(1, 'day').unix(),
        id: payload._id
    }, TOKEN_KEY)
}

export default {

    async get(req, res){
        try{
            const users = await new UserService().all()
            if(users.length > 0){
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
            if(user){
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
            const user = await new UserService().findUser(req.params.user)
            if(user){
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
            if(user){
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
        const result = await new UserService().findEmail(req.body.email)

        if(req.body.token){
            const decoded = jwt.verify(req.body.token, TOKEN_KEY)
            console.log(decoded)
        }

        if(result.length === 0){
            res.status(STATUS_NOT_FOUND).json({
                error: 'User not found'
            })
        }else if(bcrypt.compareSync(req.body.password, result.password)){
            res.status(STATUS_ACCETED).json({
                token: createToken(result)
            })
        }else{  
            res.status(STATUS_UNAUTHORIZED).json({
                error: 'Password is incorret' 
            })
        }
    }
}