require("dotenv").config();
const express = require("express");
const { login, registerUser } = require("../controllers/usersController");

const router = express.Router();

router.post("/login", login);
router.post("/register", registerUser);

module.exports = router;
