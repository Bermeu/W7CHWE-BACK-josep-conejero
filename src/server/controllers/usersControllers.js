/* const debug = require("debug")("redsocial:usersControllers"); */
const User = require("../../database/models/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json({ users });
};

module.exports = getAllUsers;
