const Users = require('../schema/users');

class UsersRepository {

    findUserId = async(userId) => {
        const findUserId = await Users.findOne({userId:userId})
        return findUserId
    }

    signup = async(userId, password) => {
        const Signup = await Users.create({userId, password})
        return Signup
    }
}

module.exports = UsersRepository;