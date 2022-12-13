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
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.use("/", routes);


app.get("/", (_, res) => res.render("home"));
app.get("/webRTC", (_, res) => res.render("webRTC"));
app.get("/index", (_, res) => res.render("index"));
app.get("/mypage", (_,res) => res.render("mypage"));
app.get("/chat", (_,res) => res.render("chat"));
app.get("/register", (_,res) => res.render("register"));

const httpServer = http.createServer(app);
const socket = require('./socket');
socket(httpServer);

httpServer.listen(3000, () => {
    console.log("server open 3000")
})









