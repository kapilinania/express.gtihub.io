const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Middleware to parse the cookie
app.use(cookieParser());

// Route handler to set a cookie 
app.get('/set-cookie', (req, res) => {
    // Set the username cookie with a max age of 5000 milliseconds
    res.cookie('username', 'kapil', { maxAge: 5000 });
    
});

// Route handler for home page 
app.get('/', (req, res) => {
    // Access cookies 
    const { username } = req.cookies;
    // Check if the username cookie exists
    if (username) {
        res.send(`Hello, ${username}!`);
    } else {
        res.send('Hello Guest');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on: https://localhost:3000');
});
