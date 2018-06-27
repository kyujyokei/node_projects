var express = require('express');
var bodyParser = require('body-parser');

var {mongoose}  = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json()); // give this json() function as a middle ware to express, so we can send json to application

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

// app.get('/todos', (req, res) => {

// });

app.listen(3000, () => {
    console.log('Starting on port 3000');
});

module.exports = {app};