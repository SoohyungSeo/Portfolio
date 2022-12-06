const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');
const usersController = new UsersController();

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.get('/logout', usersController.logout);

module.exports = router;