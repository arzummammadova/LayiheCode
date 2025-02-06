import express from 'express';
import "dotenv/config";
import cors from 'cors';
import './src/db/dbProducts.js';
import router from './src/router/bookRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';
import userRouter from './src/router/userRouter.js';
import cookieParser from "cookie-parser";
import chatRouter from './src/router/chatRouter.js';
import bodyParser from 'body-parser';
import session from 'express-session';

const port = process.env.PORT || 5001;
const app = express();
app.use(cookieParser());

// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.JWT_SECRET, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));
// Routes

app.use("/api/books", router);
app.use("/auth", userRouter);
app.use("/chat", chatRouter);

app.get("/", (req, res) => res.send("Hello world"));

app.listen(port, () => console.log(`Server is running on port ${port}`));