require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');


// Create an express app
const app = express();

//middleware
app.use(express.json());
app.use((req,res,next)=> {
    console.log(req.path, req.method);
    next();
})

// Create a route for the app
app.use('/api/workouts', workoutRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listen to port 4000
    app.listen(process.env.PORT, () => {
        console.log('Connected to DB & Server is running on port 4000');
    });
})
.catch((err) => {
    console.error(err);
});

