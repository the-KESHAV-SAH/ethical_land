<<<<<<< HEAD
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DBConnection = async () =>{
    const MONGO_URL = process.env.MONGO_URL;
    try{
        await mongoose.connect(MONGO_URL);
        console.log('DB connection established');
    }
    catch(error){
        console.log('Error connecting to MongoDB' + error);
    }
};

module.exports = {DBConnection};
=======
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

const DBConnection= async()=> {
    const MONGO_URL=process.env.MONGO_URI;
    try{
        await mongoose.connect(MONGO_URL,{useNewUrlParser:true});
        console.log("DB connection extablished!");
    }catch(error){
        console.log("Error connecting to MongoDB:"+error.message)
    }
}
module.exports={ DBConnection };
>>>>>>> 8d6b00f3c0c073f379fde0cd584f077ff0a14020
