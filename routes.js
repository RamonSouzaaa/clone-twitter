import {Router} from 'express'
import dotenv from 'dotenv'
import PostService from './src/services/posts.service.js'
import UserService from './src/services/users.service.js'
import User from './src/models/User.js'

dotenv.config()

const {STATUS_CREATED, STATUS_OK, STATUS_SERVER_ERROR} = process.env

const router = Router()

router.get('/', (req, res) => {
    res.status(STATUS_OK).json({
        mensagem: 'Ok'
    })
})

router.route('/posts')
    .get((req, res) => {
        new PostService().all().then((data) => {
            res.status(STATUS_OK).json(data)
        })
        .catch((e) => {
            res.status(STATUS_SERVER_ERROR).json(e)
        })
    })
    .post((req, res) => {
        new PostService().save(req.body).then((data) => {
            res.status(STATUS_CREATED).json(data)
        })
        .catch((e) => {
            res.status(STATUS_SERVER_ERROR).json(e)
        })
    })
    .put((req, res) => {
        
    })

router.route('/users')
    .get((req, res) => {
        new UserService().all().then((data) => {
            res.status(STATUS_OK).json(data)
        })
        .catch((e) => {
            res.status(STATUS_SERVER_ERROR).json(e)
        })
    })
    .post((req, res) => {
        new UserService().save(req.body).then((data) => {
            res.status(STATUS_CREATED).json(data)
        })
        .catch((e) => {
            res.status(STATUS_SERVER_ERROR).json(e)
        })
    })
    
export default router