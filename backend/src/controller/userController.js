
import userRegisterValidationSchema from "../middleware/validation/userRegisterValidation.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import user from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { recieveMail } from "../middleware/mailer/mailer.js";
import userLoginValidationSchema from "../middleware/validation/userLoginValidation.js";
import ForgotValidationSchema from "../middleware/validation/ForgotValidationSchema.js";
import ResetValidationSchema from "../middleware/validation/ResetValidation.js";
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getUser=async(req,res)=>{
  try {
    const users=await user.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

export const addtofavorites=async(req,res)=>{

  const { userId, bookId } = req.body;

  try {
    const userToUpdate = await user.findById(userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userToUpdate.addFavorites.includes(bookId)) {
      return res.status(500).json({ message: "Book already in favorites" });
    }

    userToUpdate.addFavorites.push(bookId);
    await userToUpdate.save();

 
    const updatedUser = await user.findById(userId).populate("addFavorites");
    res.status(200).json({ message: "Book added to addFavorites", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

export const addtoread = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const userToUpdate = await user.findById(userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userToUpdate.toRead.includes(bookId)) {
      return res.status(500).json({ message: "Book already in to-read list" });
    }

    userToUpdate.toRead.push(bookId);
    await userToUpdate.save();

 
    const updatedUser = await user.findById(userId).populate("toRead");
    res.status(200).json({ message: "Book added to to-read list", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getToReadBooks = async (req, res) => {
  const { userId } = req.params;

  try {
    const userData = await user.findById(userId).populate("toRead");
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userData.toRead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const gettofavorites=async(req,res)=>{
  const { userId } = req.params;

  try {
    const userData = await user.findById(userId).populate("addFavorites");
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userData.addFavorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export const deleteAllFromToRead = async (req, res) => {
  const { userId } = req.params;  

  try {
    const userToUpdate = await user.findById(userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    userToUpdate.toRead = [];
    await userToUpdate.save();

    res.status(200).json({ message: "All books removed from to-read list" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteallfromfavorites=async(req,res)=>{

  const { userId } = req.params;  

  try {
    const userToUpdate = await user.findById(userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    userToUpdate.addFavorites = [];
    await userToUpdate.save();

    res.status(200).json({ message: "All books removed from to-read favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export const addAndRemoveFromFavorites = async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.body;

  try {
    const userToUpdate = await user.findById(userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = userToUpdate.addFavorites.indexOf(bookId);
    if (index !== -1) {
      userToUpdate.addFavorites.splice(index, 1);
      await userToUpdate.save();
      return res.status(200).json({ message: "Book removed from favorites" });
    } else {
      userToUpdate.addFavorites.push(bookId);
      await userToUpdate.save();
      return res.status(200).json({ message: "Book added to favorites" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteFromToRead = async (req, res) => {
  const { userId, bookId } = req.params;

  try {
    const User = await user.findById(userId);
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    User.toRead = User.toRead.filter((book) => book._id.toString() !== bookId);
    await User.save();

    res.status(200).json({ message: "Book removed from to-read list" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletefromfav=async(req,res)=>{
  const { userId, bookId } = req.params;

  try {
    const User = await user.findById(userId);
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    User.addFavorites = User.addFavorites.filter((book) => book._id.toString() !== bookId);
    await User.save();

    res.status(200).json({ message: "Book removed from fav" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//? readed aid olan funksiyalar
export const addreaded = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const userToUpdate = await user.findById(userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userToUpdate.addreaded.includes(bookId)) {
      return res.status(500).json({ message: "Book already in readed book" });
    }

    userToUpdate.addreaded.push(bookId);
    await userToUpdate.save();

 
    const updatedUser = await user.findById(userId).populate("addreaded");
    res.status(200).json({ message: "Book added to addreaded", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const gettoreaded=async(req,res)=>{
  const { userId } = req.params;

  try {
    const userData = await user.findById(userId).populate("addreaded");
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userData.addreaded);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const deleteallfromreaded=async(req,res)=>{

  const { userId } = req.params;  

  try {
    const userToUpdate = await user.findById(userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    userToUpdate.addreaded = [];
    await userToUpdate.save();

    res.status(200).json({ message: "All books removed from to-read addreaded" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deletefromreaded = async (req, res) => {
  const { userId, bookId } = req.params;

  try {
    const User = await user.findById(userId);
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    User.addreaded= User.addreaded.filter((book) => book._id.toString() !== bookId);
    await User.save();

    res.status(200).json({ message: "Book removed from addreaded list" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//?

export const deleteProfileImage = async (req, res) => {
  try {
    const userId = req.params.id;

    const existingUser = await user.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!existingUser.image) {
      return res.status(400).json({ message: "No profile image to delete" });
    }

    
   
    const imagePath = path.join(__dirname, '..', '..', existingUser.image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
        return res.status(500).json({ message: "Failed to delete image" });
      }

      existingUser.image = null;
      existingUser.save();

      return res.status(200).json({ message: "Profile image deleted successfully" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};




// export const register = async (req, res) => {
//   // console.log(req.body);

//   try {
//     const { image, name, username, email, password,lastname } = req.body;

//     const { error } = userRegisterValidationSchema.validate({
//       image,
//       name,
//       username,
//       email,
//       password,
//       lastname
//     });

//     if (error) {
//       return res.status(400).json({ message: error.details[0].message });
//     }

//     const existUser = await user.findOne({ email });

//     if (existUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hasedPassword = await bcrypt.hash(password, 10);

//     const newUser = new user({
//       image,
//       name,
//       username,
//       email,
//       lastname,
//       password: hasedPassword,
//     });

//     await newUser.save();

//     const token = generateToken(newUser._id, res); 

//     // const confirmLink = `${process.env.SERVER_LINK}/auth/verify/${token}`;
//     const confirmLink = `${process.env.SERVER_LINK}/auth/verify/${encodeURIComponent(token)}`;

//     recieveMail(newUser, confirmLink);

//     return res.status(201).json({
//       message: "User created successfully",
//       newUser,
//       token, 
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

export const verifyEmail = async (req, res) => {
    try {
      const { token } = req.params;
      console.log("Token:", token);
  
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
// export const verifyEmail = async (req, res) => {
//   try {
//     const token = req.cookies.token;
    
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const updatedVerify = await user.findByIdAndUpdate(
//       { _id: decoded.id },
//       { isVerified: true }
//     );

//     if (updatedVerify) {
//       return res.redirect(`${process.env.CLIENT_LINK}/login`);
//     }
//   } catch (error) {
//     return res.status(400).json({ message: "Token not valid or expaired in" });
//   }
// };
  // export const login = async (req, res) => {
  //   const { username,password } = req.body;
  
  //   const { error } = userLoginValidationSchema.validate(req.body);
  
  //   if (error) {
  //     return res.status(400).json({ message: error.details[0].message });
  //   }
  
  //   const existUser = await user.findOne({ username: username });
  
  //   if (!existUser) {
  //     return res.status(400).json({ message: "User not found" });
  //   }
  
  //   const isMatch = await bcrypt.compare(password, existUser.password);
  
  //   if (!isMatch) {
  //     return res.status(400).json({ message: "Username or Password wrong" });
  //   }
  
  //   generateToken(existUser._id, res);
  
  //   return res.status(200).json({
  //     message: "User logged in successfully",
  //     existUser,
  //   });
  // };


  // export const logout = async (req, res) => {
  //   try {
  //     const userId = req.existUser._id; 
  
     
  //     await user.findByIdAndUpdate(userId, { isLogin: false})
  //     res.clearCookie("token");
  //     return res.status(200).json({ message: "User logged out successfully" });
  //   } catch (error) {
  //     return res.status(500).json({ message: error.message });
  //   }
  // };

  // export const logout = async (req, res) => {
  //   try {
  //     const existUser = await user.findOne({_id});
     
  //     const userId = existUser._id;
  
  //     await user.findByIdAndUpdate(userId, { isLogin: false });
  //     res.clearCookie("token");
  //     return res.status(200).json({ message: "İstifadəçi uğurla çıxış etdi" });
  //   } catch (error) {
  //     return res.status(500).json({ message: error.message });
  //   }
  // };
  
  

  // export const logout = (req, res) => {
  //   res.clearCookie("token");
  //   return res.status(200).json({ message: "User logged out successfully" });
  // };

  export const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
  
      const { error } = ForgotValidationSchema.validate(req.body);
  
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      const existUser = await user.findOne({ email });
  
      if (!existUser) return res.status(404).json({ message: "User not found" });
  
      generateToken(existUser._id, res, "resetToken");
  
      const resetLink = `${process.env.CLIENT_LINK}/resetpassword`;
  
      recieveMail(existUser, resetLink);
  
      return res.status(200).json({ message: "Reset link sent to your email" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  


  export const register = async (req, res) => {
    try {
      const { image, name, username, email, password, lastname , birthDate,bio} = req.body;
  
      const { error } = userRegisterValidationSchema.validate({ image, name, username, email, password, lastname , birthDate});
      if (error) return res.status(400).json({ message: error.details[0].message });
  
      const existUser = await user.findOne({ email });
      if (existUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const userCount = await user.countDocuments();
      const newUser = new user({
        image,
        name,
        bio,
        username,
        email,
        lastname,
        password: hashedPassword,
        birthDate,
        isAdmin: userCount === 0 ? true : false, // İlk user admin olacaq
      });
  
      await newUser.save();
  
      const token = generateToken(newUser._id, res);
      const confirmLink = `${process.env.SERVER_LINK}/auth/verify/${encodeURIComponent(token)}`;
      recieveMail(newUser, confirmLink);
  
      return res.status(201).json({ message: "User created successfully", newUser, token });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const updateProfile = async (req, res) => {
    try {
      const userId = req.params.id;
      const { name, username, email, password, lastname, birthDate, bio } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;
  
      const existingUser = await user.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      let updatedPassword = existingUser.password;
      if (password && password !== existingUser.password) {
        updatedPassword = await bcrypt.hash(password, 10);
      }
  
      const updatedUser = await user.findByIdAndUpdate(
        userId,
        {
          image: image || existingUser.image,
          name: name || existingUser.name,
          username: username || existingUser.username,
          email: email || existingUser.email,
          lastname: lastname || existingUser.lastname,
          birthDate: birthDate || existingUser.birthDate,
          bio: bio || existingUser.bio,
          password: updatedPassword,
        },
        { new: true }
      );
  
      return res.status(200).json({ updatedUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  };
  export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
  
        // Faylın URL-i
        const imageUrl = `/uploads/${req.file.filename}`;
        console.log('Uploaded file:', req.file);
  
        // res.status(200).json({ message: 'Uploaded successfully', imageUrl: imageUrl });
        res.status(200).json({ 
          message: 'Uploaded successfully', 
          imageUrl: `http://localhost:5000/uploads/${req.file.filename}` 
        });
    } catch (error) {
        console.error("Error in uploadImage:", error);  // Ətraflı xətanı loglayın
        res.status(500).json({ message: 'Failed to upload file', error: error.message });
    }
  };
  
 
  
  export const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const { error } = userLoginValidationSchema.validate(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });
  
      const existUser = await user.findOne({ username });
      if (!existUser) return res.status(400).json({ message: "User not found" });
  
      const isMatch = await bcrypt.compare(password, existUser.password);
      if (!isMatch) return res.status(400).json({ message: "Username or Password wrong" });
  
      await user.findByIdAndUpdate(existUser._id, { isLogin: true });
      generateToken(existUser._id, res);
  
      return res.status(200).json({ message: "User logged in successfully", existUser });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  


  // export const login = async (req, res) => {
  //   try {
  //     const { username, password } = req.body;
  
  //     const { error } = userLoginValidationSchema.validate(req.body);
  //     if (error) return res.status(400).json({ message: error.details[0].message });
  
  //     const existUser = await user.findOne({ username }).populate("favorites"); // Favoritləri əlavə et
  //     if (!existUser) return res.status(400).json({ message: "User not found" });
  
  //     const isMatch = await bcrypt.compare(password, existUser.password);
  //     if (!isMatch) return res.status(400).json({ message: "Username or Password wrong" });
  
  //     await user.findByIdAndUpdate(existUser._id, { isLogin: true });
  //     generateToken(existUser._id, res);
  
  //     return res.status(200).json({
  //       message: "User logged in successfully",
  //       user: {
  //         _id: existUser._id,
  //         username: existUser.username,
  //         email: existUser.email,
  //         favorites: existUser.favorites, // Favoritləri də qaytar
  //       },
  //     });
  //   } catch (error) {
  //     return res.status(500).json({ message: error.message });
  //   }
  // };
  

  export const resetPassword = async (req, res) => {
    console.log();
    console.log(req.body);
  
    try {
      const { password } = req.body;
  
      const { error } = ResetValidationSchema.validate({
        password,
      });
  
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      const resetToken = req.cookies.resetToken;
  
      if (!resetToken) {
        return res
          .status(400)
          .json({ message: "No token found, request new one" });
      }
  
      const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
  
      const existUser = await user.findById(decoded.id);
  
      if (!existUser) {
        return res.status(400).json({ message: "Token not valid or expaired" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
  
      existUser.password = hashedPassword;
  
      await existUser.save();
  
      res.clearCookie("resetToken");
  
      return res.status(200).json({ message: "Password reset successfully" });
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
  







  // export const logout = async (req, res) => {
  //   try {
  //     // console.log(req.existUser); 
  
  //     if (!req.existUser) {
  //       return res.status(400).json({ message: 'İstifadəçi doğrulama uğursuz oldu' });
  //     }
  
  //     const userId = req.existUser._id;  
  //     const existUser = await user.findById(userId);
  
  //     if (!existUser) {
  //       return res.status(404).json({ message: "İstifadəçi tapılmadı" });
  //     }
  
  //     await user.findByIdAndUpdate(userId, { isLogin: false });
  //     res.clearCookie("token");  
  //     return res.status(200).json({ message: "İstifadəçi uğurla çıxış etdi" });
  //   } catch (error) {
  //     return res.status(500).json({ message: error.message });
  //   }
  // };
  
  // export const logout = (req, res) => {
  //   res.clearCookie("token");
  //   return res.status(200).json({ message: "User logged out successfully" });

    
  // };

  export const logout = async (req, res) => {
    try {
     
      const loggedInUser = await user.findOne({ isLogin: true });
  
      if (!loggedInUser) {
        return res.status(404).json({ message: "No user is currently logged in." });
      }
  
    
      loggedInUser.isLogin = false;
      await loggedInUser.save();
  
    
      res.status(200).json({ message: "Logout successful", user: loggedInUser });
    } catch (error) {
      console.error("Error during logout:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // export const authenticateUser = async (req, res, next) => {
  //   try {
  //     const token = req.cookies.token;
  //     console.log("Token:", token); // Tokeni yoxlamaq üçün log
  
  //     if (!token) {
  //       return res.status(401).json({ message: 'Token tapılmadı, icazə verilmədi' });
  //     }
  
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Tokeni doğrulama
  //     console.log("Decoded:", decoded); // Decode edilmiş məlumatları yoxlamaq üçün log
  
  //     const user = await user.findById(decoded.id);
  //     console.log("User from DB:", user); // DB-dən alınan istifadəçi məlumatlarını yoxlamaq üçün log
  
  //     if (!user) {
  //       return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
  //     }
  
  //     req.existUser = user;
  //     next();
  //   } catch (error) {
  //     console.error("JWT Error:", error); // Xətanın loglanması
  //     res.status(401).json({ message: 'Token etibarsızdır' });
  //   }
  // };
  
 