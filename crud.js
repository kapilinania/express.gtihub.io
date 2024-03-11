const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/nstiExpress', {useNewUrlParser:true, useUnifiedTopology:true})

//Define the schema for the Item Collection in MongoDB
const itemSchema = new mongoose.Schema({
    name:String,
    trade:String,
    email:String,   
});
//Creata a model based on the schema

const Item =mongoose.model("Item", itemSchema);

//Middleware to parse JSON Bodies of incoming request

app.use(express.json());

//Error handling middleware

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send('Something Broke')
});

//Post -to create a new item in the database

app.post('/items', (req,res,next)=>{
    const newItem = new Item(req.body);
    newItem.save()
    .then(item=>{
        res.status(201).send(item);
    })
    .catch(next);
});

// Get to retrieve all the items from the database
app.get('/items', (req, res, next) => {
    Item.find()
        .then(items => {
            res.send(items);
        })
        .catch(next);
});


//get to retrive item by the id
app.get('/items/:id',(req,res,next)=>{
    const itemId = req.params.id;
    Item.findById(itemId)
    .then(item=>{
        if(!item){
            return res.status(404).json({message:'Item not found'})
        }
        res.json(item);
    })
    .catch(next);
});

// Patch - update
app.patch('/items/:id', (req, res, next) => {
    Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(item => {
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.send(item);
        })
        .catch(next);
});

// Delete 
app.delete('/items/:id', (req, res, next) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).send();
        })
        .catch(next);
});


//start the sever
app.listen(PORT, ()=>console.log(`Server is http://localhost:${PORT}`))