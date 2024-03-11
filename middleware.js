//import the express js
const express = require("express");

const app=express();

//Middleware functions to log request method and url\

app.use(function(req, res, next){
    //log the current timestamp, request method
    console.log(`[${new Date().toISOString()}]  ${req.method} ${req.url}`);
    //call next() to pass the control to the next middleware function in the stack
    next();
});

app.get('/', function(req,res){
    res.send("welcome to the home page");
});

app.get('/about', function(req,res){
    res.send("welcome to the about page");
});

//start the server

const PORT = 3000;
app.listen(PORT, function(){
    console.log(`server is running on port ${PORT}`);
})
