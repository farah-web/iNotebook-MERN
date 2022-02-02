// const express=require('express')
// const router=express.Router;
const { Router } = require('express')
const router = Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser=require('../middleware/fetchuser')

const JWTSECRET = process.env.SECRET;

//ROUTE 1: create user using:POST "/api/auth/createuser"
router.post('/createuser', [
    //validations for correct input of name,email,password--- see express-validator doc file
    body('name', 'Enter valid name.').isLength({ min: 3 }),
    body('email', 'Enter valid email.').isEmail(),
    body('password', 'Password should be atleast 5 characters long.').isLength({ min: 5 }),
], async (req, res) => {
    const { name, email, password } = req.body;
    let success=false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const userExist = await User.findOne({ email: email })
        console.log('email of user: ', userExist)
        if (userExist) {
            success=false;
            return res.status(400).json({ errors: 'Email already exist' });
        }
        //if email does not exist then encrypt password using bcrypt.hash along with bcrypt.salt
        //-- genSalt and hash are async func so use await before them
        const salt = await bcrypt.genSalt(10);
        const secPwd = await bcrypt.hash(password, salt)
        const userRegister = await User.create({
            name,
            email,
            password: secPwd
        })
        //create jwt token using sign func
        //--sign is sync func so no need of await func
        const jwt_data = {
            user: {
                id: userRegister._id
            }
        }
        console.log('The USER ID is: ', jwt_data.user.id)
        const jwt_token = jwt.sign(jwt_data, JWTSECRET);

        console.log('The USER is created successfully')
        success=true;
        res.status(201).json({'success':success,jwt_token})
    }
    catch (err) {
        console.log(err.message)
        success=false;
        res.status(500).json({ error: 'internal Server error'})
    }
})

//ROUTE 2: Authenticate user while logging in:POST "/api/auth/login"
router.post('/login', [
    //validations for correct input of email(here email is used instead of username),password--- see express-validator doc file
    body('email', 'Enter valid email.').isEmail(),
    body('password', 'Password cannot be blank.').exists(),
], async (req, res) => {
    const { email, password } = req.body;
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userExist = await User.findOne({ email });
        if (!userExist) {
            success=false;
            return res.status(400).json({ success,error: "Sorry wrong credentials" })
        }
        console.log("the User Exist passowrd is:", userExist.password)
        console.log("the passowrd is:", password)
        const comparePwd = await bcrypt.compare(password, userExist.password)
        if (!comparePwd) {
            success=false;
            return res.status(400).json({ success,error: "Sorry WRONG credentials" })
        }
        
        const jwt_data = {
            user: {
                id: userExist._id
            }
        }
        console.log('ID in login',jwt_data.user.id)
        const jwt_token = jwt.sign(jwt_data, JWTSECRET)
        success=true;
        res.json({'success':success,jwt_token})
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).json({ error: 'internal Server error'})
    }
})

//ROUTE 3: Fetch user data using fetchuser (middleware) after logging in:POST "/api/auth/getuser"
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const tokenId=req.user.id;
        const userdata=await User.findById(tokenId).select('-password')
        if(!userdata){
            res.status(401).json({ error: "Sorry user authentication failed" })
        } 
        res.json({userdata})
        
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: 'internal Server error'})
    }
})

module.exports = router