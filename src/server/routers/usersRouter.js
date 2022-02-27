require("dotenv").config();
const express = require("express");
const {
  login,
  registerUser,
  getAllUsers,
} = require("../controllers/usersController");

const router = express.Router();

router.get("/login", login);
router.post("/register", registerUser);
router.get("/", getAllUsers);

module.exports = router;
