import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorMiddleware from './middlewares/errorMiddleware.js';
import Router from './routes/index.js';
import lawRoutes from "./routes/lawRoutes.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());



app.use("/", (reg, res)=>{res.send("server is running");});

app.use("/api", Router);
app.use("/api/user", Router);
app.use("/api/laws", lawRoutes);


app.use(errorMiddleware);
export default app;
