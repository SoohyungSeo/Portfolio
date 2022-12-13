const express = require('express');
const router = express.Router();

const usersRouter = require('./users.router');

router.use("/user", usersRouter);


module.exports = router;