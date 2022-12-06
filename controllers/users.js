const UsersService = require('../services/users');

class UsersController {
    usersService = new UsersService();

    signup = async(req, res, next) => {
        try{
        const { userId, nickname, password, confirmPassword } = req.body;
        const response = await this.usersService.signup(userId,nickname, password, confirmPassword);
            res.status(200).json({'result':response, message:"회원가입을 축하드립니다!"})
        }catch(e){
            res.status(e.status || 400).json({message:e.message})
        }
    }

    login = async(req, res, next) => {
        try{
        const {userId, password} = req.body;
        const login = await this.usersService.login(userId, password);
        const accessToken = await this.usersService.accessToken(userId);
        const refreshToken = await this.usersService.refreshToken();
        await this.usersService.updateToken(userId, refreshToken);
        res.status(201).json({data: login, accessToken: `${accessToken}`, refreshToken: `${refreshToken}`})
        }catch(e){
            res.status(e.status || 400).json({message:e.message})
        }
    }

    logout = (req, res) => {
        res.status(200).json({message:"로그아웃 되었습니다."})
    }
    
}

module.exports = UsersController