const express = require('express');
const app = express();

//First Middleware before the response is sent

app.use(function(req,res,next){
    //lofg start
    console.log("start")
    //Pass the control to nect middleware or route handler
    next();
})

//route handler for get request to the root route("/")
app.get("/", function(req,res,next){
    //send the response Middle
    res.send("Middle")
    //call the next middleware
    next();
})
    //second middleware for the root route("/")
    app.use('/', function(req,res){
        //log the 
        console.log("end")
    });

    app.listen(3000, function(req,res){
        console.log("server is running on http://localhost:3000")
    })



