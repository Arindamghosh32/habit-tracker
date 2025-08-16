// Import necessary packages
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.config();

// Create the Express app
const app = express();

// Connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connection established successfully');
    } catch (error) {
        console.error('There is error in connectivity');
        console.error(error);
        process.exit(1); // Exit process with failure
    }
};

// Immediately call the connectDB function and then start the server
connectDB().then(() => {
    // Middleware to parse JSON
    app.use(express.json());

    // Configure CORS for allowed origins
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000', 'https://habit-tracker-p9t3.onrender.com','https://habit-tracker-frontend-two.vercel.app/'];

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

    // Import and use habit routes
    const habitRoutes = require('./routes/habitRoutes');
    app.use("/api/habits", habitRoutes);

    // Start the server on the specified port
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`The app is running on port ${PORT}`);
    });
});
