var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    expressSanitizer = require("express-sanitizer"),
    twit = require("twit"),
    app = express();

//TOKENS
var T = new twit({
    consumer_key: 'XH1szBHdgbGrB9MCe1Rs461fN',
    consumer_secret: 'yJM7yYeN3Zsl9nmAPwLr6028pGQHSBN0geRx236nTVBVaP7nXA',
    access_token: '718377211447930880-WFxtj2PVaaPjyqKIBggUgXeOAw5eqdd',
    access_token_secret: 'ijMq2HcUoW3DOuxdg01uWrwQXY900oK7vrgomVtHfTGCw',
    timeout_ms: 60 * 1000,
})

//CONNECTION TO DATABASE
mongoose.connect("mongodb://localhost/tweepsbookapp", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(function () {
    console.log("Connected to DB");
}).catch(function (err) {
    console.log("ERROR:", err.message);
});

//CONNECTION TO MODULES
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//MONGOOSE MODEL CONFIF/SCHEMA
var userSchema = mongoose.Schema({
    email: String,
    profile: String,
    name: String,
    id: String,
    tweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
    }]
})
var User = mongoose.model("User", userSchema);

var tweetsSchema = mongoose.Schema({
    status: String,
    tag: String
})
var Tweet = mongoose.model("Tweet", tweetsSchema);

var params = {
    status: String,
    in_reply_to_status_id: String,
    auto_populate_reply_metadata: Boolean
}

var tweet = {
    embed_link: String,
    category: String
};

//REQUESTS
app.get('/', function (req, res) {
    res.redirect('https://offf.to/tweepsbookapp')
});

var stream = T.stream('statuses/filter', { track: ['@bigansh_ bookmark'] });
stream.on('tweet', function (tweet) {
    T.get('statuses/oembed', { id: tweet.in_reply_to_status_id_str }, function (err, data, response) {
        tweet.embed_link = data.html;
    })
    T.get('statuses/show', { id: tweet.id_str }, function (err, data, response) {
        tweet.category = data.text.split(" ")[data.text.split(" ").length - 1];
        // User.create({ email: 'tweepsbook@gmail.com', name: 'Tweeps Book', id: data.user.id_str })
        User.find({ id: data.user.id_str }, function (err, user) {
            if (user.length === 0) {
                params = {
                    status: 'Hey, you have not registered with us. Hence we are unable to bookmark the tweet you requested. Please register on our website to bookmark better 🤖.',
                    in_reply_to_status_id: tweet.id_str,
                    auto_populate_reply_metadata: true
                }
            } else {
                Tweet.create({ status: tweet.embed_link, category: tweet.category }, function (err, tweet) {
                    if (err) {
                        console.log(err);
                    } else {
                        user[0].tweets.push(tweet);
                        user[0].save();
                    }
                })
                params = {
                    status: 'Hey, we have bookmarked the tweet your asked for. You can check the same in your dashboard. Thank you for using our service 🤖.',
                    in_reply_to_status_id: tweet.id_str,
                    auto_populate_reply_metadata: true
                }
            }
        }).then(function () {
            T.post('statuses/update', params, function (err, data, response) {
                if (err){
                    console.log(err);
                }
            })
        })
    })
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});