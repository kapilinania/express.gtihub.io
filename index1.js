var express  =require('express');
var app=express();

//Define a middleware function useing app.use()

app.use(function(req,res, next){
    //log a msg with the current timestamp
    console.log("A new request received at"+Date.now());

    //call the next function 
    next();
})

//route hanleer for get request /about

app.get('/about', function(req,res){
    //send the response 
    res.send("about page")
})

//start the server

app.listen(3000, function(req,res){
    console.log("server is srunning at http://localhost:3000/");
});