const express = require('express');
const router = express.Router();

const usersRouter = require('./users.router');
const chatsRouter = require('./chat.router')

router.use("/user", usersRouter);
router.use("/chat", chatsRouter);


module.exports = router;