const express = require('express');
const {createNewUser, validateUser} = require('../controllers/userControllers');
const userRouter = express.Router();


userRouter.post("/", validateUser, createNewUser);



module.exports = userRouter;