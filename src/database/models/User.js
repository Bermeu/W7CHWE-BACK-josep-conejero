const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  amigos: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  enemigos: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
});

const User = model("User", UserSchema, "users");

module.exports = User;
