import express from 'express'
import bodyParser from 'body-parser'
import mongooseConector from './moongose.connector.js'
import router from './routes.js'
import AuthMiddleware from './src/middlewares/auth-middleware.js'
import dotenv from 'dotenv'
dotenv.config()

const { HTTP_PORT, URL_MONGO_DB } = process.env

const app = express()

mongooseConector.conectar(URL_MONGO_DB)

app.use(AuthMiddleware)
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(router)

app.listen(HTTP_PORT, () => {
    console.log(`Serve connected at port ${HTTP_PORT}`)
})