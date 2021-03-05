var objects = {};

objects.bmTweet = {
    status_id: String,
    tag: String,
    id: String
}

objects.newUser = {
    email: String,
    profile: String,
    name: String,
    id: String
}

objects.params = {
    status: String,
    in_reply_to_status_id: String,
    auto_populate_reply_metadata: Boolean
}

module.exports = objects;