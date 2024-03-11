//import the express js
const express = require("express");

const app = express();

//import body parser middleware
const bodyParser = require("body-parser");

//middleware for parsing application
app.use(bodyParser.urlencoded({ extended: true }));

//Define a route for the home page 
app.get('', function(req, res) {
    //send the response welcome to the home page  to the client
    console.log("welcome to jodhpur")
    res.send("Welcome to the Home page");
});

//define a route the abnout_us page 
app.get('/about', function(req, res) {
    res.send("Welcome to the About is page page");
});

//help page 
app.get('/help', function(req, res) {
    res.send(`<h3>Welcome to help page</h3>
    <form action="/contact" method="POST">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required><br>
        <label>message:</label>
        <textarea rows="10" cols="10" name="message"></textarea>      
        <button type="submit">Submit</button>
    </form>
    `);
});

//contact page
app.get('/contact', function(req, res) {
    res.sendFile(__dirname + "/routing.html");
});

//define a route for handling form submission 
app.post('/contact', function(req, res) {
    //extract the values from the request body 
    const name = req.body.name;
    const message = req.body.message;
    res.send(`Thank you, ${name}, for your submission. Your message "${message}" has been received.`);
});

app.listen(3000, function() {
    console.log("server is starting on http://localhost:3000/");
});
