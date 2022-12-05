require('dotenv').config();
const jwt = require('jsonwebtoken');
const Users = require("../schema/users");

module.exports = async(req, res, next) => {
    const {authorization} = req.headers;    

    if(authorization == null){
     res.status(401).send('로그인이 필요합니다.')
     return   
    }

    const tokenValue = authorization
    try{
        const myToken = verifyToken(tokenValue)
        if(myToken == "jwt expired" || myToken == undefined) {
            res.status(419).json({message:"access_token_expired"})
        } else {
            const {userId} = jwt.verify(tokenValue, process.env.SECRET_KEY);
            const user = await Users.findOne({userId:userId})
            res.locals.user = user;
            next();
        }
    } catch(e){
        res.send('로그인이 필요합니다.')
    }
};

function verifyToken(token) {
    try{
        return jwt.verify(token, process.env.SECRET_KEY)
    } catch(e){
        return e.message;
    }
}