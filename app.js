var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    expressSanitizer = require("express-sanitizer"),
    twit = require("twit"),
    passport = require('passport'),
    Strategy = require('passport-twitter').Strategy,
    session = require('express-session'),
    app = express();

//TOKENS
var T = new twit({
    consumer_key: 'byiphhH8THY87ADDYvTv8Upl8',
    consumer_secret: 'EpV1XVnyLBiZkbUP8E6UzPoGmek4i48jDxmo77HEUKIvArh2tg',
    // access_token: '718377211447930880-WFxtj2PVaaPjyqKIBggUgXeOAw5eqdd',
    // access_token_secret: 'ijMq2HcUoW3DOuxdg01uWrwQXY900oK7vrgomVtHfTGCw',
    access_token: '1350865466340741120-9aHn3REe4EzC1LrQkIqTfjY2Q3DyEX', //tweepsbookapp
    access_token_secret: '9T4TlmJmDP1ahaEIo5e0U2EEVqVGd6WWlPtSGv3e0ElpB', //tweepsbookapp
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
app.use(session({ secret: 'whatever', resave: true, saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session());

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


var user = {
    email: String,
    profile: String,
    name: String,
    id: String
}

//REQUESTS
passport.use(new Strategy({
    consumerKey: 'byiphhH8THY87ADDYvTv8Upl8',
    consumerSecret: 'EpV1XVnyLBiZkbUP8E6UzPoGmek4i48jDxmo77HEUKIvArh2tg',
    userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
    callbackURL: '/twitter/return',
    proxy: true
}, function (token, tokenSecret, profile, cb) {
    // console.log(profile);
    user.id = profile.id;
    user.email = profile.emails[0].value;
    user.name = profile.displayName;
    user.profile = profile.photos[0].value;
    User.create(user, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log(user);
        }
    })
    return cb(null, profile);
}));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

app.get('/login/twitter',
    passport.authenticate('twitter'));

app.get('/twitter/return',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    }
);

app.get('/', function (req, res) {
    // res.redirect('https://offf.to/tweepsbookapp')
    res.render('index')
});

var stream = T.stream('statuses/filter', { track: ['@tweepsbookapp bookmark'] });
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
                    status: 'Hey, you have not registered with us. Hence we are unable to bookmark the tweet you requested. Please register on our website to bookmark better 🤖. https://offf.to/tweepsbookapp',
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
                if (err) {
                    console.log(err);
                }
            })
        })
    })
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});