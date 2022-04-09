import User from '../models/User.js'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Types: {ObjectId}} = mongoose
const { Types: {String}} = mongoose.Schema

class UserService {
    async all(){
        return await User.find().populate('posts')
    }

    async findId(id){
        return await User.findOne({
            _id: ObjectId(id)
        }).populate('posts') 
    }  

    async find(data){
        return await User.find(data).populate('posts')
    }

    async save(data){
        data.password = bcrypt.hashSync(data.password, 2)
        const user = new User(data)
        return await user.save()
    }

    async update(user, data){
        return user.updateOne(data)
    }

    async delete(id){
        return User.deleteOne({
            _id: ObjectId(id)
        })
    }
}

export default UserService