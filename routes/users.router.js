const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');
const usersController = new UsersController();

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.get('/login', function (req, res) {
    res.render("home");
  });

module.exports = router;