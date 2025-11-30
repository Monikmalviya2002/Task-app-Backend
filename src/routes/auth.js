import express from "express"
import validateSignUpData from "../utils/validation.js";
import bcrypt from "bcrypt"
import User from "../models/user.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authRouter = express.Router();

   // register a new user
  authRouter.post("/register", async(req,res)=>{

    try{ 
    validateSignUpData(req);

    const{ username,emailId,password} = req.body;
    const passwordHash = await bcrypt.hash(password,10);

    const existingUser = await User.findOne({ emailId });
     if (existingUser) {
    return res.status(400).json({ error: "Email already registered" });
     }

     const user = new User({
        username,
        emailId,
        password: passwordHash,
     });
      const savedUser=  await user.save();
    const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY)

        res.cookie("token", token);

       res.json({ message: "User Added Successfully", data: savedUser });
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
     };
   
      });
    

   authRouter.post("/login", async(req,res)=>{
    try{
     const {username, password} = req.body;
     const user = await User.findOne({username : username})
     if(!user){
        throw new Error("invalide username and password");
     }

     const isPasswordValid =  await bcrypt.compare(password, user.password)
       if(isPasswordValid){
        
     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);


        res.cookie("token", token);
        res.send(user);
     }
     else{
        throw new Error("invalide username and password")
     }
    }catch(err){
        res.status(400).send("ERROR:" + err.message);
}

});


authRouter.post("/logout",async(req,res)=>{
   res.cookie("token", null,{
    expires: new Date(Date.now()),
      });   

      res.send("log out successfully");

});



  export default authRouter;
   
  