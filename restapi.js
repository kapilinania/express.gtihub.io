const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require('uuid');

// Create express application instance
const app = express();
const PORT = 3000;

// Middleware setup
app.use(bodyParser.json()); // Parse the JSON bodies

// Sample data 
let users = [
    {
        firstName: "kapil",
        lastName: "choudhary",
        age: 25,
        id: "124"
    },
    {
        firstName: "Kanika",
        lastName: "Singh",
        age: 24,
        id: "125"
    },
    {
        firstName: "kavita",
        lastName: "inaniya",
        age: 20,
        id: "126"
    },
    {
        firstName: "Rohit",
        lastName: "inaniya",
        age: 20,
        id: "127"
    }
];

// Define routes

// GET method to retrieve all users
app.get("/", (req, res) => {
    res.send(users); // Send the array of users as the response
});

// POST method to add a new user
app.post("/", (req, res) => {
    // Extract data from the request body
    const { firstName, lastName, age } = req.body;

    // Check if all the required fields are present
    if (!firstName || !lastName || !age) {
        return res.status(400).json({ message: "First Name, Last Name and age are required" });
    }

    // Create a new user object with unique id
    const newUser = { id: uuidv4(), firstName, lastName, age };

    // Add new user to the array 
    users.push(newUser);

    // Send a message with the newly created user
    res.status(201).json(newUser);
});

// GET method to retrieve a user by ID
app.get("/:id", (req, res) => {
    // Extract the user id from the URL parameter
    const { id } = req.params;
    // Find the user with id in the array
    const foundUser = users.find((user) => user.id === id);

    // If the user is not found, return error 404
    if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
    }
    res.send(foundUser);
});

// DELETE method to delete a user by id
app.delete("/:id", (req, res) => {
    const { id } = req.params;
    users = users.filter((user) => user.id !== id);
    res.send(`User with the id ${id} deleted from the database`);
});

// PATCH method to update a user by id
app.patch("/:id", (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    const userIndex = users.findIndex((user) => user.id === id);

    // If the user is not found, then throw error
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    // Update the user object with the provided fields
    if (firstName) {
        users[userIndex].firstName = firstName;
    }
    if (lastName) {
        users[userIndex].lastName = lastName;
    }
    if (age) {
        users[userIndex].age = age;
    }

    // Send a success response with the updated user
    res.json(users[userIndex]);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
