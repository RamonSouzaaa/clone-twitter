import User from '../models/User.js'

class UserService {
    async all(){
        return await User.find()
    }

    async save(data){
        const user = new User(data)
        return await user.save()
    }
}

export default UserService