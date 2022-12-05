const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const { instrument } = require('@socket.io/admin-ui');
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");
const connect = require("../schema")
const routes = require('../routes')
const authMiddleware = require("../middleware/auth-middleware");
const bodyParser = require('body-parser')
connect();

const Users = require("../schema/users")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.use("/", routes)


app.get("/", (_, res) => res.render("home"));
app.get("/webRTC", (_, res) => res.render("webRTC"));

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer)

//========================Socket Login===============================
wsServer.on("connection", (socket) => {

})

httpServer.listen(3000, () => {
    console.log("server open 3000")
})
//=======================fuctionLogic===================
    //access 발급

function accessToken(ID){
    const access_Token = jwt.sign({userId:ID},
        process.env.SECRET_KEY,{
            expiresIn:"12h"
        })
        return access_Token
}

    //refresh 발급
async function refreshToken(ID){
    const refresh_Token = jwt.sign({}, process.env.SECRET_KEY,{
        expiresIn:"1d"
    })
    await Users.updateOne({userId:ID},{$set:{refresh_token:refresh_Token}})
    return refresh_Token
}





