import express from "express";
import multer from 'multer'
import { addAndRemoveFromFavorites, addreaded, addtofavorites, addtoread, deleteallfromfavorites, deleteallfromreaded, deleteAllFromToRead, deletefromfav, deletefromreaded, deleteFromToRead, deleteProfileImage, forgotPassword, gettofavorites, getToReadBooks, gettoreaded, getUser, login, logout, register, resetPassword, updateProfile, uploadImage, verifyEmail } from "../controller/userController.js";
import path from 'path'

const userRouter = express.Router();



const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
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
userRouter.get("/", getUser);
userRouter.post("/resetpassword", resetPassword);
userRouter.delete("/deleteprofileimage/:id", deleteProfileImage);
// userRouter.put("/editprofile/:id", updateProfile);
userRouter.post('/addToRead', addtoread)
userRouter.get('/:userId/getaddtoread', getToReadBooks)
userRouter.delete('/:userId/to-read', deleteAllFromToRead);
userRouter.delete('/:userId/to-read/:bookId', deleteFromToRead);

userRouter.post('/addFavorites',addtofavorites)
userRouter.get('/:userId/getfavorites',gettofavorites)
userRouter.delete('/:userId/delallfavorites', deleteallfromfavorites)

userRouter.post('/:userId/favorites', addAndRemoveFromFavorites);
// 67a870fa98311aa6d2a5aefa


//?readed aid olan router
userRouter.post('/addreaded',addreaded)
userRouter.get('/:userId/getreaded',gettoreaded)
userRouter.delete('/:userId/deleteallreaded', deleteallfromreaded)
userRouter.delete('/:userId/deletereaded/:bookId', deletefromreaded);

export default userRouter;
