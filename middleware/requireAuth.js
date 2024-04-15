const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async(req, res, next) => {

    //verify the user is authenticated

    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).send('Authorization token required');
    }

    const AccessToken = authorization.replace('Bearer ', '');

    //verify the token
    try{
        const {_id} = jwt.verify(AccessToken,process.env.JWT_SECRET)
        req.user = await User.findById({_id}).select(_id);
        next();
    }
    catch(err){
        console.log(err);
        return res.status(401).send('Request not authorized');
    }


}

module.exports = requireAuth;