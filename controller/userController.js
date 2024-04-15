const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//create access token
const createAccessToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET, { expiresIn: "2h" });
};

//create refresh token
const createRefreshToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

//login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
    
        //create access token
        const accessToken = createAccessToken(user._id);
        //create refresh token
        const refreshToken = createRefreshToken(user._id);
    
        res.status(200).json({ email, accessToken, refreshToken});
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
    const accessToken = createAccessToken(user._id);
    //create refresh token
    const refreshToken = createRefreshToken(user._id);

    res.status(200).json({ email, accessToken, refreshToken});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };


