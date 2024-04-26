const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sheduleSchema = new Schema({
    gym_id: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }

},{timestamps: true});