const axios = require('axios');
const stringToArray = require('../utils/stringToArray');

const User = require('../models/Users');


const saveUser = async (req, resp) => {
  const { github_username, techs, latitude, longitude } = req.body;

  //if(await User.findOne({ github_username })) return resp.send('Usuario ja cadastrado');

  const response = await axios.get(`https://api.github.com/users/${github_username}`);
  const { name = login, avatar_url, bio } = response.data;
  
  const techsArray = await stringToArray(techs);

  const location = {
    type: 'Point',
    coordinates: [latitude, longitude]
  }
  const user = await User.create({
    github_username,
    techs: techsArray,
    name,
    avatar_url,
    bio,
    location
  });

  return resp.json(user);
};

const getUsers = async (req, resp) => {
  const users = await User.find({});

  return resp.json({ users });
}

module.exports = {
  saveUser,
  getUsers
};