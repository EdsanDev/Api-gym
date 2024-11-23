import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Rutas from './src/routes/index.js'
import dotenv from "dotenv";

dotenv.config();
const app = express()

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true}
))
app.use(morgan('dev'));
app.use(express.json())
app.use(cookieParser())
Rutas(app)

export default app;