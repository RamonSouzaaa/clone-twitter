import User from '../models/User.js'
import mongoose from 'mongoose'

const { Types: {ObjectId}} = mongoose

class UserService {
    async all(){
        return await User.find()
    }

    async findId(id){
        return await User.findOne({
            _id: ObjectId(id)
        })
    }

    async save(data){
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