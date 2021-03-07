var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    email: String,
    profile: String,
    name: String,
    id: String,
    tweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    }]
});

module.exports = mongoose.model("User", userSchema);