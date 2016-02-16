var mongoose = require('mongoose');
var User = require('../users/UserModel.js');

var User = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  walking: {
    type: Number,
    default: 0
  },
  jogging: {
    type: Number,
    default: 0
  },
  situps: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('User', User);