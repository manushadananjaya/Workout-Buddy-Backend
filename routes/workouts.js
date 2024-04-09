const express = require('express');
const { create } = require('../models/WorkoutModel');
const { createWorkout,getWorkout,getWorkouts,deleteWorkout,updateWorkout } = require('../controller/workoutController');

const router = express.Router();

// get all workouts
router.get('/', getWorkouts)

// get a specific workout
router.get('/:id', getWorkout)

// create a new workout
router.post('/', createWorkout)

// update a workout
router.patch('/:id', updateWorkout)

// delete a workout
router.delete('/:id', deleteWorkout)



module.exports = router;
// This code creates a new router object and assigns it to the variable router. 
//Then, it exports the router object so that it can be used in other files. This is a common pattern in Express applications, 
//where routes are defined in separate files and then imported into the main server file.