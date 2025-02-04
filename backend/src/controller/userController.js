import user from "../models/userModel.js";
import userRegisterValidationSchema from "../middleware/validation/userRegisterValidation.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";

import { generateToken } from "../utils/generateToken.js";
import { recieveMail } from "../middleware/mailer/mailer.js";
import userLoginValidationSchema from "../middleware/validation/userLoginValidation.js";

export const register = async (req, res) => {
  // console.log(req.body);

  try {
    const { image, name, username, email, password,lastname } = req.body;

    const { error } = userRegisterValidationSchema.validate({
      image,
      name,
      username,
      email,
      password,
      lastname
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existUser = await user.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      image,
      name,
      username,
      email,
      lastname,
      password: hasedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser._id, res); 

    // const confirmLink = `${process.env.SERVER_LINK}/auth/verify/${token}`;
    const confirmLink = `${process.env.SERVER_LINK}/auth/verify/${encodeURIComponent(token)}`;

    recieveMail(newUser, confirmLink);

    return res.status(201).json({
      message: "User created successfully",
      newUser,
      token, 
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
    try {
      const { token } = req.params;
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const updatedVerify = await user.findByIdAndUpdate(
        { _id: decoded.id },
        { isVerified: true }
      );
  
      if (updatedVerify) {
        return res.redirect(`${process.env.CLIENT_LINK}/login`);
      }
    } catch (error) {
      console.error("Error verifying token:", error);  // Log the error to understand the problem
      return res.status(400).json({ message: "Token not valid or expired" });
    }
  };

  export const login = async (req, res) => {
    const { username,password } = req.body;
  
    const { error } = userLoginValidationSchema.validate(req.body);
  
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    const existUser = await user.findOne({ username: username });
  
    if (!existUser) {
      return res.status(400).json({ message: "User not found" });
    }
  
    const isMatch = await bcrypt.compare(password, existUser.password);
  
    if (!isMatch) {
      return res.status(400).json({ message: "Username or Password wrong" });
    }
  
    generateToken(existUser._id, res);
  
    return res.status(200).json({
      message: "User logged in successfully",
      existUser,
    });
  };




  export const logout = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "User logged out successfully" });
  };

  export const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
  
      const existUser = await user.findOne({ email });
  
      if (!existUser) return res.status(404).json({ message: "User not found" });
  
      const resetToken = generateToken(existUser._id, res);
  
      const resetLink = `${process.env.CLIENT_LINK}/resetpassword/${resetToken}`;
  
      recieveMail(existUser, resetLink);
  
      return res.status(200).json({ message: "Reset link sent to your email" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
















  // export const login = async (req, res) => {
  //   const { username, email, password } = req.body;
  
  //   const { error } = userLoginValidationSchema.validate(req.body);
  
  //   if (error) {
  //     return res.status(400).json({ message: error.details[0].message });
  //   }
  
  //   // Check if the input is username or email and query accordingly
  //   const userQuery = username ? { username: username } : { email: email };
  //   const existUser = await user.findOne(userQuery);
  
  //   if (!existUser) {
  //     return res.status(400).json({ message: "User not found" });
  //   }
  
  //   // Compare the password
  //   const isMatch = await bcrypt.compare(password, existUser.password);
  
  //   if (!isMatch) {
  //     return res.status(400).json({ message: "Username or Password is incorrect" });
  //   }
  
  //   // Generate token and send response
  //   generateToken(existUser._id, res);
  
  //   return res.status(200).json({
  //     message: "User logged in successfully",
  //     existUser,
  //   });
  // };
  