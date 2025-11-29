import express from "express";
import connectDB from "./src/config/database.js";

const app = express()


connectDB();



app.listen(7777,()=>{
    console.log("server is active on 7777")
});