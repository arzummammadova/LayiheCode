import express from "express";

import upload from "../upload/upload.js";
import { forgotPassword, login, logout, register, verifyEmail } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/register", upload.single("image"), register);
userRouter.get("/verify/:token", verifyEmail);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/forgotpassword", forgotPassword);
userRouter.get("/", (req, res) => {
    res.send("Auth route is working!");
  });
  

export default userRouter;
