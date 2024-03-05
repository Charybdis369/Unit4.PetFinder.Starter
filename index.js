// import the pets array from data.js
const pets = require('./data');
const path = require('path')

const morgan = require('morgan')
// init express app
const express = require('express');
const app = express();
const PORT = 8080;

app.use(morgan('dev'))

app.use(express.urlencoded({extended: false}))

app.use(express.json())



// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
res.send(pets)
});

// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request

const owner = req.body.owner

    // find the pet in the pets array
    const pet = pets.find(pet => pet.owner === owner);

    // send the pet as a response
res.send(owner)
});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
const name = req.params.name
const body = req.body.name

    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);

    // send the pet as a response
res.send(name)
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;