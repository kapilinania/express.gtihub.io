var express = require("express");
var app = express();
var mailer = require("express-mailer");

// Configure express mailer 
mailer.extend(app, {
    from: 'inaniyakapil2000@gmail.com',
    host: 'smtp.gmail.com',  // Hostname
    secureConnection: true,
    port: 465,
    transportMethod: 'SMTP',
    auth: {
        user: 'inaniyakapil2000@gmail.com',
        pass: 'dzaa buqv ccuf bddt'
    }
});

// Set up views
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// Define route to send mail
app.get('/', function (req, res, next) {
    app.mailer.send('email', {
        to: 'bhaikapil175@gmail.com',
        subject: 'test mail',
        otherProperty: 'other Property'
    }, function (err) {
        if (err) {
            console.log(err);
            res.send("There was an error in sending mail");
            return;
        }
        res.send('Email sent');
    });
});

// Start the server 
app.listen(3000, function () {
    console.log("Express mail is listening on port: https://localhost:3000");
});
