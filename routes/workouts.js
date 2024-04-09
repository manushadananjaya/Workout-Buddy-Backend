const express = require('express');

const router = express.Router();

// get all workouts
router.get('/', (req, res) => {
    res.json({
        message: 'All workouts'
    });
})

// get a specific workout
router.get('/:id', (req, res) => {
    res.json({
        message: 'Specific workout'
    });
})

// create a new workout
router.post('/', (req, res) => {
    res.json({
        message: 'Create a new workout'
    });
})

// update a workout
router.patch('/:id', (req, res) => {
    res.json({
        message: 'Update a workout'
    });
})

// delete a workout
router.delete('/:id', (req, res) => {
    res.json({
        message: 'Delete a workout'
    });
})



module.exports = router;
// This code creates a new router object and assigns it to the variable router. 
//Then, it exports the router object so that it can be used in other files. This is a common pattern in Express applications, 
//where routes are defined in separate files and then imported into the main server file.