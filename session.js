var express = require("express");
var app = express();

var session = require('express-session');
app.use(session({ secret: "secret-key" }));

app.get('/', function (req, res) {
    req.session.username = "Express js Session";
    res.send("Session is set");
});

// Define a route for the "/get-session"
app.get('/get-session', function (req, res) {
    if (req.session.user_visit) {
        req.session.user_visit++;
        res.send("You have visited this page " + req.session.user_visit + " times");
    } else {
        req.session.user_visit = 1;
        res.send("You are visiting this page for the 1 times");
    }
});

// Start the server
app.listen(5000);
console.log("Your app is running on: http://localhost:5000/");
