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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err)
    res.status(500).json({ error: 'Internal Server Error' })
})

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
})

// Routes
app.use("/api/workouts", workoutRoutes)

// Database connection
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables')
        }
        
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected successfully')
        
        // Only start the server if we're not in a Vercel environment
        if (process.env.NODE_ENV !== 'production') {
            const port = process.env.PORT || 4000
            app.listen(port, () => {
                console.log(`Server running on port ${port}`)
            })
        }
    } catch (error) {
        console.error('Database connection error:', error)
        process.exit(1)
    }
}

connectDB()

// Export the Express API
module.exports = app
