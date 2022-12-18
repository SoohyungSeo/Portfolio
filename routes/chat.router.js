const express = require('express');
const router = express.Router();
const middleware = require("../middleware/auth-middleware")

const ChatController = require('../controllers/chat');
const chatController = new ChatController();

router.get('/member', middleware, chatController.findMember);

module.exports = router;