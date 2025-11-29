import mongoose from "mongoose";
import validator from "validator"

const userSchema = new mongoose.Schema({
    username:{
        type:String,
       required: true,
       minLength : 3,
        maxLength : 20
    },

     emailId: {
    type : String,
    required: true,
    lowercase :true,
    trim : true,
    unique : true,
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
    },
  },
  { timestamps: true }
);

    
const User = mongoose.model("User", userSchema);

export default User;