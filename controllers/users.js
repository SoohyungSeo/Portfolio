const UsersService = require('../services/users');

class UsersController {
    usersService = new UsersService();

    signup = async(req, res, next) => {
        try{
        const { userId, password, confirmPassword } = req.body;
        const response = await this.usersService.signup(userId, password, confirmPassword);
            res.status(200).json({'result':response, message:"회원가입을 축하드립니다!"})
        }catch(e){
            res.status(e.status || 400).json({statusCode:e.status, message:e.message})
        }
    }

    login = async(req, res, next) => {
        try{
        const {userId, password} = req.body;
        await this.usersService.login(userId, password);
        res.status(201).json({accessToken:`Bearer ${accessToken}`})
        }catch(e){
            res.status(e.status || 400).json({statusCode:e.status, message:e.message})
        }
    }
    
}

module.exports = UsersController