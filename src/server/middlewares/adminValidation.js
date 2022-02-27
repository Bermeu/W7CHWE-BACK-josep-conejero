const User = require("../../database/models/User");

const adminValidation = async (req, res, next) => {
  const { id } = req;

  const user = await User.findById(id);

  if (!user.admin) {
    const error = new Error("Sorry, you don't have privilegies to do this");
    error.code = 403;
    next(error);
  } else {
    next();
  }
};

module.exports = adminValidation;
