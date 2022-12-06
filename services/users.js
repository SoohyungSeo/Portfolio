const UsersRepository = require("../repositories/users");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const checkID = /^[a-zA-Z0-9]{4,15}$/;
const checkNickname = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{4,15}$/;
const checkPW = /^[a-zA-Z0-9]{8,30}$/;


class UsersService {
    usersRepository = new UsersRepository();

    signup = async(userId,nickname,password,confirmPassword) => {
        const validateID = await this.usersRepository.findUserId(userId);
        const validateNickname = await this.usersRepository.findUserNickname(nickname);
        if(validateID){
            const e = new Error(`UserService Error`);
            e.status = 409;
            e.message = "이미 가입된 아이디입니다."
            throw e
        }
        if(validateNickname){
            const e = new Error(`UserService Error`);
            e.status = 409;
            e.message = "이미 존재하는 닉네임입니다."
            throw e
        }
        if(password !== confirmPassword){
            const e = new Error(`UsersServive Error`);
            e.status = 403;
            e.message = "비밀번호와 비밀번호 확인란이 같지 않습니다."
            throw e
        }
        if(!checkID.test(userId)){
            const e = new Error(`UsersServive Error`);
            e.status = 403;
            e.message = "아이디는 최소 4자리 최대 15자리입니다."
            throw e
        }
        if(!checkPW.test(password)){
            const e = new Error(`UsersServive Error`);
            e.status = 403;
            e.message = "비밀번호는 최소 8자리 이상 30자리 미만입니다."
            throw e
        }                
        const salt = await bcrypt.genSalt(10);
        const enpryptedPW = bcrypt.hashSync(password, salt);
        password = enpryptedPW;         
        const signup = await this.usersRepository.signup(userId,nickname,password);
        return signup;
    };
    
    login = async(userId, password) => {
        const loginUser = await this.usersRepository.login(userId)
        const checkPassword = await bcrypt.compare(password, loginUser.password)
        if(!loginUser){
            const e = new Error(`UsersServive Error`);
            e.status = 403;
            e.message = "아이디가 없거나 옳바르지 않습니다.";
            throw e;
        }
        if(!checkPassword){
            const e = new Error(`UsersServive Error`);
            e.status = 403;
            e.message = "비밀번호가 옳바르지 않습니다.";
            throw e;
        }
        return loginUser;
    };

    accessToken = async(userId) => {
        const accessToken = jwt.sign({userId: userId}, process.env.SECRET_KEY, {
            expiresIn: "1h"
        });
        return accessToken;
    };

    refreshToken = async() => {
        const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {
            expiresIn: "1d"
        });
        return refreshToken;
    };

    updateToken = async(userId, refresh_token) => {
        await this.usersRepository.updateToken(userId, refresh_token)
        const updateToken = await this.usersRepository.findUser(userId, refresh_token);
        return updateToken
    }


}

module.exports = UsersService;