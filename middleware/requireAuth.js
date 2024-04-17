const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const e = require('express');

const requireAuth = async(req, res, next) => {

    //verify the user is authenticated

    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).send('Authorization token required');
    }

    const AccessToken = authorization.replace('Bearer ', '');

    //verify the token
    try{
        const {_id} = jwt.verify(AccessToken,process.env.ACCESS_SECRET)
        req.user = await User.findById({_id}).select(_id);
        next();
    }
    catch (err) {
        console.error(err.message);

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }

        return res.status(401).json({ error: 'Invalid token' });
    }


}

module.exports = requireAuth;