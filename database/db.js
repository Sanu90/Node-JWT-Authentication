const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const mongoConnect = process.env.MONGO_URL


const connectMyDB = async ()=>{
    try{
       
        await mongoose.connect(mongoConnect);
        console.log("DB connected");
        

    }catch(error){
        console.log("Error at connectMyDB in db.js", error);
        process.exit(1)
    }
}


module.exports=connectMyDB;