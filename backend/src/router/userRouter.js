import express from "express";

import upload from "../upload/upload.js";
import { forgotPassword, getUser, login, logout, register, resetPassword, verifyEmail } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/register", upload.single("image"), register);
userRouter.get("/verify/:token", verifyEmail);
// userRouter.get("/verify", verifyEmail);
userRouter.post("/login", login);
// userRouter.post("/logout",authenticateUser, logout);
userRouter.post("/logout", logout);
userRouter.post("/forgotpassword", forgotPassword);
userRouter.get("/",getUser);
userRouter.post("/resetpassword", resetPassword);



export default userRouter;
