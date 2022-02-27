require("dotenv").config();

const jsonwebtoken = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const headerAuth = req.header("Authorization");
  if (typeof headerAuth !== "undefined") {
    const tokenId = headerAuth.split(" ")[1];

    if (typeof tokenId !== "undefined") {
      try {
        const validatedUser = await jsonwebtoken.verify(
          tokenId,
          process.env.SECRET
        );

        req.id = validatedUser.id;

        next();
      } catch {
        const error = new Error("invalid token");
        error.code = 400;
        next(error);
      }
    }
  } else {
    const newError = new Error("Token missing");
    newError.code = 401;
    next(newError);
  }
};

module.exports = verifyToken;
