const gym = require("../models/gymModel");
const mongoose = require("mongoose");

//get all gyms by location
const getGyms = async (req, res) => {
  try {
    const gyms = await gym.find({ location: req.params.location });
    res.status(200).json(gyms);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get a specific gym

const getGym = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Gym not found" });
    }
    
    try {
        const gym = await gym.findById(id);
        if (!gym) {
            return res.status(404).json({ error: "Gym not found" });
        }
        
        res.status(200).json({ gym });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//create a new gym

const createGym = async (req, res) => {
    const { name, location, price , description , schedule , billingDate , rating , user_id , image , phone , email , website , facebook , instagram , twitter } = req.body;

    //add document to the database
    try {
        const gym = await gym.create({ name, location, price , description , schedule , billingDate , rating , user_id , image , phone , email , website , facebook , instagram , twitter });
        res.status(200).json({ gym });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    
}

//update a gym

const updateGym = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Gym not found" });
    }
    
    try {
        const gym = await gym.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ gym });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//delete a gym

const deleteGym = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Gym not found" });
    }
    
    try {
        await gym.findByIdAndDelete(id);
        res.status(200).json({ message: "Gym deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { getGyms, getGym, createGym, updateGym, deleteGym };




