import express from "express";
import connectDB from "./src/config/database.js";
import dotenv from "dotenv";
import authRouter from "./src/routes/auth.js";
import taskRouter from "./src/routes/task.js"
import cors from "cors"
import cookieParser from "cookie-parser";

dotenv.config();

const app = express()

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());



app.use("/api/auth", authRouter);
app.use("/api", taskRouter);


connectDB();



app.listen(process.env.PORT,()=>{
    console.log("server is active")
});