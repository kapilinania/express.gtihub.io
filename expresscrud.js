const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "", // Provide your MySQL password here
   database: "kapilexpress" 
});

// Connect to MySQL
connection.connect(function(err) {
    if (err) {
        console.log("Error in the connection");
        console.log(err);
    } else {
        console.log("Database Connected");
    }
});

// Route to create a table (assuming you've created it already)
app.get('/create_table', function(req, res) {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255)
        )
    `;
    connection.query(createTableQuery, function(err, result) {
        if (err) {
            console.log(`Error creating table - ${err}`);
            res.status(500).send('Error creating table');
        } else {
            res.send('Table created successfully');
        }
    });
});

// Route to insert a new record
app.post('/users', function(req, res) {
    const { name, email } = req.body;
    const insertQuery = `INSERT INTO users (name, email) VALUES (?, ?)`;
    connection.query(insertQuery, [name, email], function(err, result) {
        if (err) {
            console.log(`Error inserting record - ${err}`);
            res.status(500).send('Error inserting record');
        } else {
            res.send('Record inserted successfully');
        }
    });
});

// Route to fetch all records
app.get('/users', function(req, res) {
    connection.query('SELECT * FROM users', function(err, result) {
        if (err) {
            console.log(`Error fetching records - ${err}`);
            res.status(500).send('Error fetching records');
        } else {
            res.send(result);
        }
    });
});

// Route to update a record
app.put('/users/:id', function(req, res) {
    const { name, email } = req.body;
    const id = req.params.id;
    const updateQuery = `UPDATE users SET name=?, email=? WHERE id=?`;
    connection.query(updateQuery, [name, email, id], function(err, result) {
        if (err) {
            console.log(`Error updating record - ${err}`);
            res.status(500).send('Error updating record');
        } else {
            res.send('Record updated successfully');
        }
    });
});

// Route to delete a record
app.delete('/users/:id', function(req, res) {
    const id = req.params.id;
    const deleteQuery = `DELETE FROM users WHERE id=?`;
    connection.query(deleteQuery, [id], function(err, result) {
        if (err) {
            console.log(`Error deleting record - ${err}`);
            res.status(500).send('Error deleting record');
        } else {
            res.send('Record deleted successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}/`);
});
