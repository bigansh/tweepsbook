var twit = require("twit"),
    dotenv = require("dotenv")

dotenv.config();

var twitterConnect = new twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN, //tweepsbookcom
    access_token_secret: process.env.ACCESS_TOKEN_SECRET, //tweepsbookcom
    timeout_ms: 60 * 1000
});

module.exports = twitterConnect;
