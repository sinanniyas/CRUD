const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // hashed password
});

const AuthModel = mongoose.model("auths", AuthSchema);

module.exports = AuthModel;
