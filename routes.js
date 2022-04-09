import {Router} from 'express'
import PostController from './src/controllers/post.controller.js'
import UserController from './src/controllers/user.controller.js'

const router = Router()

router.route('/posts')
    .get(PostController.get)
    .post(PostController.post)

router.route('/posts/:id')
    .put(PostController.put)
    .delete(PostController.delete)

router.route('/users')
    .get(UserController.get)
    .post(UserController.post)

router.route('/users/:id')
    .put(UserController.put)
    .delete(UserController.delete)
    
router.get('/users/:user', UserController.findUser)

router.post('/login', UserController.login)

export default router