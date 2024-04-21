const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        default: ''
    }
});

//static signup method
userSchema.statics.signup = async function(email, password) {

    //validate email

    if(!email || !password) {
        throw new Error('Email and password are required');
    }

    if (!validator.isEmail(email)) {
        throw new Error('Email is invalid');
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password is weak');
    }


    const exists = await this.findOne({ email });

    if (exists) {
        throw new Error('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new this({ email, password: hash });
    await user.save();
    return user;
}
    



// static login method

userSchema.statics.login = async function(email, password) {

    if(!email || !password) {
        throw new Error('Email and password are required');
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw new Error('Invalid email');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error('Invalid password');
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);