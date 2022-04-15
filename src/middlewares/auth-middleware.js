import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const { 
    TOKEN_KEY,
    STATUS_UNAUTHORIZED,
    STATUS_SERVER_ERROR
} = process.env

const AuthMiddleware = (req, res, next) => {
    const urlExcludes = [
        '/login',
    ]
    if(!urlExcludes.includes(req.path)){
        const { authorization } = req.headers
        if(!authorization){
            res.status(STATUS_UNAUTHORIZED).json({
                error: 'Authorization required'
            })
        }else{
            try{
                const decoded = jwt.verify(authorization, TOKEN_KEY)
                req.decoded = decoded
                next()
            }catch(e){
                res.status(STATUS_SERVER_ERROR).json({
                    error: e
                })
            }
        }
    }else{
        next()
    }
}

export default AuthMiddleware