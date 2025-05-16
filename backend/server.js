require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workout.js')

//express app
const app = express()

// Middleware
app.use(express.json())

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
    next()
})

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
})

// Routes
app.use("/api/workouts", workoutRoutes)

// Error handling middleware - must be after routes
app.use((err, req, res, next) => {
    console.error('Error:', err)
    res.status(500).json({ error: 'Internal Server Error' })
})

// Database connection
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables')
        }

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        })

        console.log('MongoDB connected successfully')
    } catch (error) {
        console.error('Database connection error:', error)
    }
}

// Initialize database connection
connectDB()

// Export the Express API
module.exports = app
