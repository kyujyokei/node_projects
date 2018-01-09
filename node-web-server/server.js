const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send({
        name: 'Kei',
        likes: [
            'food',
            'sleep'
        ]
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Got an error'
    });
});

app.listen(3000);