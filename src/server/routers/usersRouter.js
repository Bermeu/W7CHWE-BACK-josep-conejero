require("dotenv").config();
const express = require("express");
const { login, registerUser } = require("../controllers/usersController");
const getAllUsers = require("../controllers/usersControllers");

const router = express.Router();

router.get("/login", login);
router.post("/register", registerUser);
router.get("/", getAllUsers);

module.exports = router;
