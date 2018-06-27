var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // set up for promises
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose: mongoose
};