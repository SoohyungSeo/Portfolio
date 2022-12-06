const Users = require('../schema/users');

class UsersRepository {

    findUserId = async(userId) => {
        const findUserId = await Users.findOne({userId:userId})
        return findUserId
    }

    findUserNickname = async(nickname) => {
        const findUserNickname = await Users.findOne({nickname:nickname});
        return findUserNickname
    }

    signup = async(userId, nickname, password) => {
        const Signup = await Users.create({userId,nickname, password})
        return Signup
    }

    login = async(userId) => {
        const login = await Users.findOne({userId: userId})
        return login
    }

    updateToken = async(userId, refresh_token) => {
        const updateToken = await Users.updateOne({userId:userId}, {$set:{refresh_token:refresh_token}});
        return updateToken
    }

    findUser = async(userId) => {
        const findUser = await Users.findOne({userId:userId});
        return findUser
    }
}

module.exports = UsersRepository;