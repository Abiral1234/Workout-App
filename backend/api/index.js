const express = require('express')
const {
    createWorkout,
    getWorkouts,
    getAWorkout,
    deleteWorkout,
    updateWorkout
}=require('../controllers/workoutController')

const router = express.Router()

//Get all workouts
router.get('/',getWorkouts)

//Get a single workouts
router.get('/:id',getAWorkout)

router.post('/',createWorkout)

router.delete('/:id',deleteWorkout)

router.patch('/:id',updateWorkout)

module.exports = router