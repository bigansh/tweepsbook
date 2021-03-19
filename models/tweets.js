var mongoose = require("mongoose");

var tweetsSchema = mongoose.Schema({
    embed: String,
    tag: String,
    id: String
});

module.exports = mongoose.model("Tweet", tweetsSchema);