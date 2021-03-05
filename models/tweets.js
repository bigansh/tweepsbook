var mongoose = require("mongoose");

var tweetsSchema = mongoose.Schema({
    status_id: String,
    tag: String,
    id: String
});

module.exports = mongoose.model("Tweet", tweetsSchema);