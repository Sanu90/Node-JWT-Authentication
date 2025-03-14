const express = require('express');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

const User = require('../database/models/user')
const dotenv = require('dotenv')
dotenv.config();

const router = express.Router();

router.post('/register',async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({error:'User already exists'})
        }

        user = new User({
            name,
            email,
            password
        })

        const hashedPassword = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,hashedPassword)
        await user.save();
        return res.status(201).json({msg:'User registration successfull'})

    } catch (error) {
        console.log("Error happened at register",error);
       res.status(500).json({
        error: error.message
       }) 
    }
})