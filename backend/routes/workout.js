const express = require('express')
const {
    createWorkout,
    getWorkouts,
    getAWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

const router = express.Router()

// Get all workouts
router.get('/', getWorkouts)

// Get a single workout
router.get('/:id', getAWorkout)

// Create a new workout
router.post('/', createWorkout)

// Delete a workout
router.delete('/:id', deleteWorkout)

// Update a workout
router.patch('/:id', updateWorkout)

module.exports = router