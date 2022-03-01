require("dotenv").config();
const express = require("express");
const {
  login,
  registerUser,
  getAllUsers,
} = require("../controllers/usersController");

const router = express.Router();

router.post("/login", login);
router.post("/register", registerUser);
router.get("/", getAllUsers);

module.exports = router;
