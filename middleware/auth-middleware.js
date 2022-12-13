require('dotenv').config();
const jwt = require('jsonwebtoken');
const Users = require("../schema/users");

module.exports = async(req, res, next) => {
    const {authorization} = req.headers;
    if(authorization == null){
     res.status(401).send('로그인이 필요합니다.')
     return   
    }

    const [tokenType, tokenValue]=authorization.split(" ")

    if(tokenType !== "Bearer"){
        res.status(401).send({
            errorMessage: "로그인이 필요합니다."
        });
        return
    }
        
    try{
        const myToken = verifyToken(tokenValue)        
        if(myToken == "jwt expired" || myToken == undefined){
            const decodeJWT = jwt.decode(tokenValue,process.env.SECRET_KEY)
            const userId = decodeJWT.userId
            const confirmUser = await Users.findOne({userId:userId})
            if(!confirmUser){
                res.status(403).json({message:"가입된 회원이 아닙니다."})
            }
            const reAccess = jwt.sign({userId:userId}, process.env.SECRET_KEY, {
                expiresIn: "1h"
            })
            res.status(201).json({data: reAccess, message: "access Token이 재발급 되었습니다."})            
        } else {
            const { userId } = jwt.verify(tokenValue, process.env.SECRET_KEY);
            const user = await Users.findOne({userId:userId})
            res.locals.user = user;
            next();
        }
    } catch (error){
        res.send({errorMessage: err + " :로그인이 필요합니다."})
    }
}

function verifyToken(token){
    try{
        return jwt.verify(token, process.env.SECRET_KEY)
    } catch(error){
        return error.message;
    }
}