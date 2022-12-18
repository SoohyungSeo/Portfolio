const ChatService = require('../services/chat');

class ChatController {
    chatService = new ChatService();

    findMember = async(req, res, next) => {
        try{
        const nickname = res.locals.user.nickname;
        const findMember = await this.chatService.findMember(nickname);
        res.status(200).json({data:findMember});
        }catch(e){
            res.status(419).json({message:e.message});
        }
    }
}

module.exports = ChatController