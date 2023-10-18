const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  Username: { type: String, required: true },
  passAdmin: { type: String, required: true },
});

module.exports = mongoose.model("admin", adminSchema);
