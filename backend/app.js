import express from 'express';
import "dotenv/config";
import cors from 'cors';
import './src/db/dbProducts.js';
import router from './src/router/bookRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';
import userRouter from './src/router/userRouter.js';
import cookieParser from "cookie-parser";

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

// Routes
app.use("/api/books", router);
app.use("/auth", userRouter);

app.get("/", (req, res) => res.send("Hello world"));

app.listen(port, () => console.log(`Server is running on port ${port}`));