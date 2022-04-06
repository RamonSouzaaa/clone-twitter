import mongoose from 'mongoose'

export default {
    conectar(url){
        mongoose.connect(url,{
            useNewUrlParser: true
        })
    }
}
