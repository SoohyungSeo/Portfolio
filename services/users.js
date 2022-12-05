const UsersRepository = require("../repositories/users");
const bcrypt = require('bcrypt')


class UsersService {
    usersRepository = new UsersRepository();

    signup = async(userId,password,confirmPassword) => {
        const validateID = await this.usersRepository.findUserId(userId);
        console.log(validateID)
        if(validateID){
            const e = new Error(`UserService Error`);
            e.status = 409;
            e.message = "이미 가입된 아이디입니다."
            throw e
        }
        const salt = await bcrypt.genSalt(10);
        const enpryptedPW = bcrypt.hashSync(password, salt);
        password = enpryptedPW;         
        const signup = await this.usersRepository.signup(userId,password);
        return signup
    }   


}

module.exports = UsersService;