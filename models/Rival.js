// models/Rival.js
const mongoose = require("mongoose");

// Define the schema for a Rival
const RivalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rivalryWith: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Rival", RivalSchema);
