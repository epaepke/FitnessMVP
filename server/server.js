var express = require('express');
var app = express();
var mongoose = require('mongoose');
var User = require('users/UserModel.js');


mongoose.connect('mongodb://localhost/fitness');

app.use(express.static(__dirname + '/../client'));

app.listen(2000);
