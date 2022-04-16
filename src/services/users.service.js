import User from '../models/User.js'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Types: {ObjectId}} = mongoose

class UserService {
    all(){
        return User.aggregate([
            {
                $project: {
                    _id: true,
                    name: true,
                    age: true,
                    bio: true,
                    user:true,
                    email: true,
                    birth_date: true,
                    posts: {
                        $size: "$posts"
                    }
                }
            }
        ])
    }

    findId(id){
        return User.findById(id).populate('posts')
    }  

    findUser(data){
        return User.findOne({
            user: data
        }).populate('posts')
    }

    findEmail(email){
        return User.findOne({
            email : email
        }).populate('posts')
    }

    save(data){
        data.password = bcrypt.hashSync(data.password, 2)
        const user = new User(data)
        return user.save()
    }

    update(user, data){
        return user.updateOne(data)
    }

    delete(id){
        return User.deleteOne({
            _id: ObjectId(id)
        })
    }
}

export default UserService