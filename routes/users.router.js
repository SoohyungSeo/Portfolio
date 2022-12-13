const express = require('express');
const router = express.Router();
const middleware = require("../middleware/auth-middleware")

const UsersController = require('../controllers/users');
const usersController = new UsersController();

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.get('/logout', usersController.logout);
router.get('/mypage',middleware, usersController.mypage);

module.exports = router;