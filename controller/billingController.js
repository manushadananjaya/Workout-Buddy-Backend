const billing = require('../models/billing');
const mongoose = require('mongoose');   

//get all billings
const getBillings = async (req, res) => {
    const user_id = req.user._id;

    try{
        const billings = await billing.find({ user_id }).sort({createdAt: -1});
        res.status(200).json({billings});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}

//get a specific billing
const getBilling = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Billing not found'});
    }

    try{
        const billing = await billing.findById(id);
        if(!billing){
            return res.status(404).json({error: 'Billing not found'});
        }

        res.status(200).json({billing});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}

//create a new billing
const createBilling = async (req, res) => {
    const {user_id, amount, date } = req.body;

    //add document to the database
    try{
        const billing = await billing.create({user_id, amount, date});
        res.status(200).json({billing});
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
    
}

//update a billing

const updateBilling = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Billing not found'});
    }

    try{
        const billing = await billing.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({billing});
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

//delete a billing
const deleteBilling = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Billing not found'});
    }

    try{
        await billing.findByIdAndRemove(id);
        res.status(200).json({message: 'Billing deleted successfully'});
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

module.exports = {getBillings, getBilling, createBilling, updateBilling, deleteBilling};
