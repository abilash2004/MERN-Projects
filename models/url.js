// urlModel.js
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortId: String,
  redirectURL: String,
  visitHistory: [
    {
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;