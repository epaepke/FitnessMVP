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

app.get('/api/users/obtain', function(req, res, next) {
  var query = req.query
  var name = JSON.parse(query.query).name;
  var uname = JSON.parse(query.query).username;
  return db.findUser(uname, function(a) {
    res.send(a);
  });
});


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

app.post('/api/users/signin', function(req, res, next) {
  return db.findUser(req.body.username, function(b) {
    res.send(JSON.stringify(b));
  });
});

app.post('/api/users/update', function(req, res, next) {
  activity = req.body[0];
  quantity = req.body[1];
  username = req.body[2].username;
  db.updateTable(req.body).then(res.send(""));
});

app.get('/logout', function(req, res, next) {
  res.redirect('/#/signin')
})


app.use(express.static(__dirname + '/../client'));

app.listen(2000);
