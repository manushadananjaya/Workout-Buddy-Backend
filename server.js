const express = require('express');

// Create an express app
const app = express();

// Create a route for the app
app.get('/', (req, res) => {
    res.send('Hello World');
});


//listen to port 4000

app.listen(4000, () => {
    console.log('Server is running on port 4000');
    }
);
