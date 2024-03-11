//sql connection with express
const express = require('express');
const app = express();

const mysql = require('mysql');

//creating a mysql connection 

const connection = mysql.createConnection({
   host:"localhost",
   user:"root",
   password:"",
   database:"kapilexpress" 
});

//Connecting to mysql Database
connection.connect(function(err){
    if(err){
        console.log("Error in the connection");
        console.log(err);
    }
    else{
        console.log("Database Connected");
        //Executing a query to show databse
        connection.query('SHOW DATABASES', function(err,result){
            if(err)
                console.log(`Error executing the query - ${err}`);
            else
                console.log("Result:",result);
        });
    }

});
//start the server
app.listen(3000, ()=>{
    console.log(`Server is running on port http://localhost:3000/`);
});
