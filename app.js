const express = require('express');
const app=express()
const dotenv = require('dotenv');
dotenv.config()

const connectDB = require('./database/db')
const authRoutes = require("./routes/auth")
const protectedPageRoute = require("./routes/protectedPage")

connectDB()
const port = process.env.PORT;

app.use(express.json())

console.log("PORT IN .env file is-->",port);

app.get('/',(req,res)=>{
    console.log("Request.method at / is....",req.method)
    
    res.send(`Hello Sanup.. This is working at port number ${port}`)
})


app.use('/auth',authRoutes);
app.use('/protectedPage',protectedPageRoute);



app.listen(port, ()=>{
    console.log(`Server running at ${port}`);
    
})




