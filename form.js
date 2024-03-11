//import express
const express = require("express");
const app = express();
const port = 3000;

//middleware for parsing the application 

app.use(express.urlencoded({extended:true}));

//serve the html form 

app.get('/', (req, res) => {
    //send the html content with a form to the client
    res.send(`
        <h1>Simple form</h1>
        <form action="/" method="post">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required />
            <label for="email">Email</label>
            <input type="email" id="email" name="email" />
            <label for="message">Message</label>
            <textarea name="message" id="message" cols="40" rows="4"></textarea>
            <button type="submit">Submit</button>
        </form>
    `);
});

//handle form submittion
app.post('/',(req,res)=>{
    //extract form data from the request body
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    //send a thank you message 
    res.send(`<h1>Thank you for your response  
    <p>${name} we have received your message</p>
    <p>Email ${email}</p>
    <p>Message ${message}</p>
    </h1>`)

})

//start the server

app.listen(port,()=>{
    console.log(`server is running on: http://localhost:${port}`)
})