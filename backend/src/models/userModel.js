import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
  image:{
    type: String,
    required: false,
  },
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    }
,    
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // confirmPassword: {
    //   type: String,
    //   required: true
    // },
    isVerified: {
      type: Boolean,
      default: false,
    },  
  },
  { collection: "Users", timestamps: true }
);

const user = mongoose.model("User", userSchema) || mongoose.models.user
export default user;
