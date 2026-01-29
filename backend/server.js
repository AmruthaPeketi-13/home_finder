import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

dotenv.config();
connectDB();

const app = express();

// CORS Configuration for production
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://homefinder1.vercel.app',
    // Add your Vercel URL here after deployment
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Backend is running',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Home Finder API',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            auth: '/api/auth',
            properties: '/api/properties'
        }
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(`🚀 Backend running on port ${PORT}`)
);

