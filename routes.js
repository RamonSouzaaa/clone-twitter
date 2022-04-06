import {Router} from 'express'
import dotenv from 'dotenv'
import PostService from './src/services/posts.service.js'

dotenv.config()

const {STATUS_CREATED, STATUS_OK} = process.env

const router = Router()

router.get('/', (req, res) => {
    res.status(STATUS_OK).json({
        mensagem: 'Ok'
    })
})

router.route('/posts')
    .get((req, res) => {
        const { body } = req
        new PostService().all().then((data) => {
            res.status(STATUS_OK).json(data)
        })
    })
    .post((req, res) => {
        new PostService().save(req.body).then((data) => {
            res.status(STATUS_CREATED).json(data)
        })
    })


export default router