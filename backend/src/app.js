import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorMiddleware from './middlewares/errorMiddleware.js';
import Router from './routes/index.js';
import connectDB from './config/db.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

await connectDB();

app.get("/", (reg, res)=>{res.send("server is running");});

app.use("/api", Router);

app.use(errorMiddleware);
export default app;
