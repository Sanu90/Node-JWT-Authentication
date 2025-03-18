const express = require('express');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

const User = require('../database/models/user')
const dotenv = require('dotenv')
dotenv.config();

const router = express.Router();

router.post('/register',async(req,res)=>{
    console.log("Inside registration");
    console.log("User entered data is-->", req.body);
    
    
    const {name,email,password} = req.body;
    try { 
        let user = await User.findOne({email})
        if(user){
            console.log("User already available");
            
            return res.status(400).json({error:'User already exists'})
        }

        user = new User({
            name,
            email,
            password
        })

        console.log("User entered password-->", password);
        const hashedPassword = await bcrypt.genSalt(10);
        console.log("Hashed password-->", hashedPassword);
        
        user.password = await bcrypt.hash(password,hashedPassword)
        await user.save();
        console.log("User created");
        return res.status(201).json({msg:'User registration successfull'})

    } catch (error) {
        console.log("Error happened at register",error);
       res.status(500).json({
        error: error.message
       }) 
    }
})


router.post('/login', async(req,res)=>{
    console.log("Inside Login-->");

    console.log("user entered data is-?", req.body);

    const {email,password} = req.body;
    try {
        if(!email && !password){
            res.status(400),json({
                error: 'Please enter both fields..'
            })
        }else{
            let user = await User.findOne({email:email});
            if(!user){
                return res.status(400).json({error: 'User not found'})
            }
            const verifyPasswords = await bcrypt.compare(password,user.password)
            console.log("verifyPasswords-->", verifyPasswords);
            
            if(!verifyPasswords){
                return res.status(400).json({error: "Invalid password"})
            }

            const payload = { userId: user.id}

            console.log("The payload is-->", payload);
            

            const JWTtoken = jwt.sign(payload,process.env.JWT_KEY, {expiresIn:3600})
            console.log("JWT token created is-->", JWTtoken);
            return res.status(201).json({token: JWTtoken})
            
        }


    } catch (error) {
        console.log("Error happened inside login", error);
        return res.status(500).json({err: error.message})        
    }   
})

module.exports = router;