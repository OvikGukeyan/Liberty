import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './router/index.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

dotenv.config()

const PORT = process.env.PORT || 7777;
const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware);

const start = async() => {
    try {
        mongoose.connect(process.env.DB_URL)

        app.listen(PORT, () => {
            console.log(`Server started on localhost:${PORT}/`)
        })
    } catch (error) {
        console.log(error)
    }
};

start();

