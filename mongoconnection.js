// Import required modules
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

// Define route
app.get('/', function(req, res){
    res.send("Connected to MongoDB");
});

// Define the MongoDB Connection URI
const mongoURI = 'mongodb://localhost:27017';

// Connect to MongoDB
MongoClient.connect(mongoURI, { useUnifiedTopology: true })
.then(client => {
    console.log("Connected to MongoDB");
    // Access the database object
    const db = client.db();

    // Start the server
    app.listen(3000, () => {
        console.log(`Server is running on port http://localhost:3000/`);
    });
})
.catch(error => {
    console.error('Error connecting to MongoDB', error);
});
