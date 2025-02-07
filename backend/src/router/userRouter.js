import express from "express";
import multer from 'multer'
import { deleteProfileImage, forgotPassword, getUser, login, logout, register, resetPassword, updateProfile, uploadImage, verifyEmail } from "../controller/userController.js";
import path from 'path'

const userRouter = express.Router();



const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) => 
      cb(null, Date.now() + path.extname(file.originalname)) // Düzəliş edildi
  });
  
  const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) cb(null, true);
      else cb(new Error('Only images are allowed!'), false);
    }
  });


  userRouter.put("/editprofile/:id", upload.single('image'), updateProfile);
userRouter.post("/upload", upload.single('image'), uploadImage);
userRouter.post("/register", upload.single("image"), register);
userRouter.get("/verify/:token", verifyEmail);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/forgotpassword", forgotPassword);
userRouter.get("/",getUser);
userRouter.post("/resetpassword", resetPassword);
userRouter.delete("/deleteprofileimage/:id", deleteProfileImage);
// userRouter.put("/editprofile/:id", updateProfile);





export default userRouter;
