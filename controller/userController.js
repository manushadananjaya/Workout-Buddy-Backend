const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createAccessToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET, { expiresIn: "2h" });
};

//login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
    
        //create token
        const AccessToken = createAccessToken(user._id);
    
        res.status(200).json({ email, AccessToken });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//signup user
const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.signup(email, password);

    //create token
    const AccessToken = createAccessToken(user._id);

    res.status(200).json({ email, AccessToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };


