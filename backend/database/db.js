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