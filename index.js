import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './router/index.js';

dotenv.config()

const PORT = process.env.PORT || 7777;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api', router);

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

