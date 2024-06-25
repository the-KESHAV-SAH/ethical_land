const express=require('express');
const app=express();
const {DBConnection} = require('./database/db.js');
const User = require("./models/Users.js");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

//midllewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//create a connection
DBConnection();
app.get("/",(req,res)=>{
    res.send("Welcome to Ethical Land!")
});

app.post("/register",async(req,res)=>{
    try{
        //get all data from the body
        const{firstname,lastname,email,password}=req.body;
        //check all data should exist
        if (!(firstname && lastname && email && password)) {
            return res.status(400).send("Please enter all the information");
        }
        //check if user exists
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).send("User Already Exists!")
        }
        //hash the password
        // var hashPassword = bcrypt.hashSync(password, 8);
        // console.log(hashPassword);
        const hashedPassword = await bcrypt.hash(password, 10);
        //save the user to the database
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });
        //generate a token for user and send it   jwt.sign(payload,private key,expiry_time)
        const token=jwt.sign({id:user._id,email},process.env.SECRET_KEY,{
            expiresIn:"1h"
        });
        user.token=token;
        user.password=undefined;//because we dont want to send the password to frontend
        res
            .status(200)
            .json({ message: "You have successfully registered!", user, success: true, token});
        }
        catch(error){
        console.error(error);
    }
});

// app.get("/register",(req,res)=>{
//     res.send("REGISTER")
// });
// app.get("/login",(req,res)=>{
//     res.send("LOGIN")
// });
app.listen(8000, ()=>{
    console.log("Server is listening on port 8000");
});