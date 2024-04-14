const Workout = require('../models/WorkoutModel');
const mongoose = require('mongoose');

// get all workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id;

    try{
        const workouts = await Workout.find({ user_id }).sort({createdAt: -1});
        res.status(200).json({workouts});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}

// get a specific workout
const getWorkout = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Workout not found'});
    }

    try{
        const workout = await Workout.findById(id);
        if(!workout){
            return res.status(404).json({error: 'Workout not found'});
        }

        res.status(200).json({workout});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}

// create a new workout
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body;

    //add document to the database
    try{
        const user_id = req.user._id;
        const workout = await Workout.create({title, reps, load , user_id});
        res.status(200).json({workout});
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

// update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Workout not found'});
    }

    try{
        const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body});
        if(!workout){
            return res.status(404).json({error: 'Workout not found'});
        }

        res.status(200).json({message: 'Workout updated successfully'});
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Workout not found'});
    }

    try{
        const workout = await Workout.findOneAndDelete({_id: id});

        if(!workout){
            return res.status(404).json({error: 'Workout not found'});
        }

        res.status(200).json({message: 'Workout deleted successfully'});

    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout

}
// This code exports an object that contains a createWorkout function.