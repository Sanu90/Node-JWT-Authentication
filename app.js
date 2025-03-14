const express = require('express');
const app=express()
const dotenv = require('dotenv');
dotenv.config()

const connectDB = require('./database/db')
const authenticate = require('./middleware/auth')

connectDB()
const port = process.env.PORT

console.log("PORT IN .env file is-->",port);

app.get('/',(req,res)=>{
    console.log("Request.method at / is....")
    
    res.send(`Hello Sanup.. This is working at port number ${port}`)
})
authenticate.authenticate();



app.listen(port, ()=>{
    console.log(`Server running at ${port}`);
    
})




