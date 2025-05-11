require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workout.js')

//express app
const app = express()

app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        // Only start the server if we're not in a Vercel environment
        if (process.env.NODE_ENV !== 'production') {
            app.listen(process.env.PORT || 4000, () => {
                console.log("Connected to db and Listening on port", process.env.PORT || 4000)
            })
        }
    })
    .catch((error)=>{
        console.log(error)
    })

app.use("/api/workouts", workoutRoutes)

// Export the Express API
module.exports = app
