const User = require('../models/Users');
const stringToArray = require('../utils/stringToArray');

const findUser = async (req, resp) => {
  const { latitude, longitude, techs } = req.query;

  const techsArray = await stringToArray(techs);

  const users = await User.find({
    techs: {
      $in: techsArray
    },
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        $maxDistance: 10000
      }
    }
  });

  resp.json({ users });
}

module.exports = {
  findUser
}