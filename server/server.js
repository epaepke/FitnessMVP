var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db/db.js')
var session = require('express-session');


var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret: 'superSecret',
  resave: true,
  saveUninitialized: true
}));


app.post('/api/users/signup', function(req, res, next) {
  name = req.body.name;
  uname = req.body.username;
  pword = req.body.password;

  db.createUser({name: name, uname: uname, pword:pword})
    .then(function(newUser) {
      req.session.regenerate(function() {
        req.session.id = newUser._id;
      });
    });
});

app.use(express.static(__dirname + '/../client'));

app.listen(2000);
