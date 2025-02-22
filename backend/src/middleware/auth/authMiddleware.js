import jwt from "jsonwebtoken";
import user from "../../models/userModel.js";


export const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization || req.cookies.token;


        if (!token) {
            return res.status(401).json({ message: "Token yoxdur, icazəsiz giriş!" });
        }

        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1]; 
        }
        console.log("Ayrılmış Token:", token);
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
        
        const userr = await user.findById(decoded.id).select("-password");
        console.log("İstifadəçi:", userr);

        if (!userr) {
            return res.status(401).json({ message: "İcazəsiz giriş!" });
        }

        req.user = userr; 
        console.log("İstifadəçi:", req.user); 
        

        next();
    } catch (error) {
        console.error("Auth Xətası:", error);
        res.status(401).json({ message: "Token yanlışdır!" });
    }
};


export const adminProtect = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: "Sizin admin icazəniz yoxdur!" });
    }
};
