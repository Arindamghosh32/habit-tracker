const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

dotenv.config();

const connectDB = require('./config/db');

connectDB();

app.use(express.json());

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const habitRoutes = require('./routes/habitRoutes');
app.use("/api/habits",habitRoutes);

app.listen(process.env.PORT,()=>{
    console.log("The app is running on port 5000");
});
