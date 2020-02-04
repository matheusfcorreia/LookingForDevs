const mongoose = require('mongoose');
const Point = require('./utils/PointSchema'); 

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  github_username: {
    type: String,
    required: true
  },
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: Point,
    index: '2dsphere'
  }
});

module.exports = mongoose.model('Users', UsersSchema);