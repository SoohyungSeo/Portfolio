const Users = require('../schema/users');

class ChatRepository {

    findMember = async(nickname) => {
        const findMember = await Users.findOne({nickname:nickname})
        return findMember
    } 
}

module.exports = ChatRepository;