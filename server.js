require('dotenv').config();

const express = require('express');
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

//listen to port 4000

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 4000');
    }
);
