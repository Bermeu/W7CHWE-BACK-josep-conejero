const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  return encryptedPassword;
};
module.exports = encryptPassword;
