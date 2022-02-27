require("dotenv").config();
const express = require("express");
/* const { login, registerUser } = require("../controllers/usersController"); */
const getAllUsers = require("../controllers/usersControllers");

const router = express.Router();

router.get("/", getAllUsers);
/* router.post("/login", login);
router.post("/register", registerUser); */

module.exports = router;
