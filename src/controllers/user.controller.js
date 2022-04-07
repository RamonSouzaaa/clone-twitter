import UserService from '../services/users.service.js'
import dotenv from 'dotenv'
dotenv.config()

const {STATUS_CREATED, STATUS_OK, STATUS_SERVER_ERROR} = process.env

export default {

    async get(req, res){
        const users = await new UserService().all()
        res.status(STATUS_OK).json(users)
    },

    async post(req, res){
        const user = await new UserService().save(req.body)
        res.status(STATUS_CREATED).json(user)
    }
}