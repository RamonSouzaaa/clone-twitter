import User from '../models/User.js'

class UserService {
    async all(){
        return await User.find({})
    }

    async save(data){
        const user = new User({
            name: data.name,
            age: data.age,
            bio: data.bio,
            user: data.user,
            location: data.location,
            posts: data.posts,
            email: data.email,
            prolife_pic: data.prolife_pic,
            bith_date: data.bith_date
        })
        return await user.save()
    }
}

export default UserService