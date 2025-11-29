import mongoose from "mongoose";

     async function connectDB() {
       try{

          await mongoose.connect("mongodb+srv://monikmalviya2:knObj0x9qHuikiYi@monik04.vyrcayb.mongodb.net/Task app")
           console.log("Database connection successfull")
        }catch(err){
          console.error("Database connection failed", err);
       }

}

  export default connectDB;