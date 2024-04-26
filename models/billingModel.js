const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billingSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    gym_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    paid: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

},{timestamps: true});

module.exports = mongoose.model('Billing', billingSchema);