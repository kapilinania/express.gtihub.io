//handleing query string parameter
//import express
var express = require('express');
var app = express();

//Define route
app.get('/:id',function(req,res){
    res.send('the id you menthod us '+req.params.id)
});
//start the server
app.listen(5000);
