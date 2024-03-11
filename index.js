//import express js framework

const express = require('express');

//create an express application instance

const app=express();

app.get('/', function(req,res){
    //send the response hello world to client
    res.send("welcome to adit class");

})

//start the express server and lusten for incoming connection on port 
app.listen(5000, function(){
    console.log("server is running on http://locathost:5000/");

})