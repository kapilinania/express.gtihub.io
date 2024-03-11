const express = require('express')
const app = express();
//set the views
app.set('views', './views');

//set the pug
app.set('view engine', 'pug');


//define a route to render the home page
app.get('/',(req,res)=>{
    res.render('sample');
})

//start the server
app.listen(5000, function(){
    console.log("Server is running on port https://localhost:5000/")
})