const ChatRepository = require('../repositories/chat');

class ChatService {
    chatRepository = new ChatRepository();

    findMember = async(nickname) => {
        const findMember = await this.chatRepository.findMember(nickname);
        if(!findMember){
            const e = new Error(`ChatService Error`);
            e.status = 413;
            e.message = "닉네임이 없습니다."
            throw e
        }
        return findMember
    }
}

module.exports = ChatService;