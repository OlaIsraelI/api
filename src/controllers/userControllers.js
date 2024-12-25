const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User  = require('../models/userModel');
const generateOtp = require("../helpers/generateRandomToken");


//Validation Middleware
const validateUser = [
  body("firstName").notEmpty().withMessage("First Name is required"),
  body("lastName").notEmpty().withMessage("Last Name is required"),
  body("email").isEmail().withMessage("Email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

//Create new user function
const createNewUser = async (req, res) => {

  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;
  try{
    const userExist = await User.findOne({ email });

    if(userExist){
      return res.status(400).json({error: "User with email already exists"});
    }

    //create a new user
    //generate a new otp || verification token
    const verificationToken = generateOtp();
    //hash the password of the user

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    //save the token and the hash password on the database

    let currentDate = new Date();
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      verificationToken, verificationTokenExpires:  currentDate.setHours(currentDate.getHours() + 1)
    });


    await newUser.save();

    if(!newUser){
      return res.status(400).json({error: "User not created"});
    }
    //send a verification email to the created user
    return res.status(201).json({message: "User created successfully", newUser});



  }catch(error){
    res.status(500).json({error: "Server Error"});
  }
};

module.exports = { createNewUser, validateUser};