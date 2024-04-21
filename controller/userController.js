const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createAccessToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.ACCESS_SECRET, { expiresIn: "5m" });
};

//create refresh token
const createRefreshToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.REFRESH_SECRET, { expiresIn: "10m" });
};

//login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
    
        //create token
        const AccessToken = createAccessToken(user._id);
        const RefreshToken = createRefreshToken(user._id);
    
        res.status(200).json({ email, AccessToken , RefreshToken});
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
    const RefreshToken = createRefreshToken(user._id);

    res.status(200).json({ email, AccessToken , RefreshToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const refreshUser = async (req, res) => {
  
  const { RefreshToken } = req.body;

  if (!RefreshToken) {
    return res.status(401).send("Refresh token required");
  }

  try {
    const { _id } = jwt.verify(RefreshToken, process.env.REFRESH_SECRET);
    const user = await User.findById({ _id });

    const AccessToken = createAccessToken(user._id);

    res.status(200).json({ email: user.email, AccessToken });
  } catch (error) {
    res.status(401).send("Invalid token");
  }
}

module.exports = { loginUser, signupUser , refreshUser};


