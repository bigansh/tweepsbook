var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    expressSanitizer = require("express-sanitizer"),
    twit = require("twit"),
    passport = require('passport'),
    Strategy = require('passport-twitter').Strategy,
    session = require('express-session'),
    MongoStore = require('connect-mongo').default,
    app = express();

//CONNECTION TO DATABASE
mongoose.connect("mongodb+srv://bigansh_:bigansh_@tweeples.diemi.mongodb.net/test", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(function () {
    console.log("Connected to DB");
}).catch(function (err) {
    console.log("ERROR:", err.message);
});

//TOKENS
var T = new twit({
    consumer_key: 'byiphhH8THY87ADDYvTv8Upl8',
    consumer_secret: 'EpV1XVnyLBiZkbUP8E6UzPoGmek4i48jDxmo77HEUKIvArh2tg',
    access_token: '1350865466340741120-9aHn3REe4EzC1LrQkIqTfjY2Q3DyEX', //tweepsbookapp
    access_token_secret: '9T4TlmJmDP1ahaEIo5e0U2EEVqVGd6WWlPtSGv3e0ElpB', //tweepsbookapp
    timeout_ms: 60 * 1000,
});

//MIDDLEWARES
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'whatever',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb+srv://bigansh_:bigansh_@tweeples.diemi.mongodb.net/test" }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14 //14 Days
    }
}));
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
    status_id: String,
    tag: String,
    id: String
})
var Tweet = mongoose.model("Tweet", tweetsSchema);

//OBJECTS
var bmTweet = {
    status_id: String,
    tag: String,
    id: String
};

var newUser = {
    email: String,
    profile: String,
    name: String,
    id: String
}

var params = {
    status: String,
    in_reply_to_status_id: String,
    auto_populate_reply_metadata: Boolean
}

//REQUESTS
passport.use(new Strategy({
    consumerKey: 'byiphhH8THY87ADDYvTv8Upl8',
    consumerSecret: 'EpV1XVnyLBiZkbUP8E6UzPoGmek4i48jDxmo77HEUKIvArh2tg',
    // requestTokenURL: 'https://api.twitter.com/oauth/request_token?x_auth_access_type=read',
    includeEmail: true,
    callbackURL: '/twitter/return',
    proxy: true
}, function (token, tokenSecret, profile, cb) {
    newUser.id = profile.id;
    newUser.email = profile.emails[0].value;
    newUser.name = profile.displayName;
    newUser.profile = profile.photos[0].value;
    User.find({ id: profile.id }, function (err, user) {
        if (user.length === 0) {
            User.create(newUser);
            console.log("User created.");
        }
    })
    return cb(null, profile);
}));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (userID, cb) {
    User.find({ id: userID })
        .then(function (user) {
            cb(null, user);
        }).catch(function (err) {
            cb(err)
        })
});

app.get('/login/twitter',
    passport.authenticate('twitter'));

app.get('/twitter/return',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    }
);

app.get('/dashboard', function (req, res) {
    User.find({ id: req.user[0].id }).populate("tweets").exec(function (err, user) {
        res.send(user);
    })
})

app.get('/', function (req, res) {
    res.send('<h1>Hi there!</>')
});

app.get('/check', function (req, res) {
    if (req.isAuthenticated()) {
        res.send("<h1>You are!</>")
    } else {
        res.send("<h1>You arn't</h1>")
    }
})

app.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/check')
})

var stream = T.stream('statuses/filter', { track: ['@tweepsbookapp bookmark'] });
stream.on('tweet', function (tweet) {
    T.get('statuses/show', { id: tweet.in_reply_to_status_id_str }, function (err, data, response) {
        bmTweet.status_id = data.id_str;
    })
    T.get('statuses/show', { id: tweet.id_str }, function (err, data, response) {
        bmTweet.tag = data.text.match(/(?=[\s*#])[\s*#]\w+/g)
        if (bmTweet.tag[1] != null) {
            bmTweet.tag = data.text.match(/(^|\s)#(\w+)/g).map(function (v) { return v.trim().substring(1); })[0]
            bmTweet.tag = bmTweet.tag.toLowerCase();
        } else {
            bmTweet.tag = null;
        }
        User.find({ id: data.user.id_str }, function (err, user) {
            if (user.length === 0) {
                params = {
                    status: 'Hey, you have not registered with us. Hence we are unable to bookmark the tweet you requested. Please register on our website to bookmark better 🤖. https://offf.to/tweepsbookapp',
                    in_reply_to_status_id: tweet.id_str,
                    auto_populate_reply_metadata: true
                }
            } else {
                bmTweet.id = user[0].id;
                Tweet.create(bmTweet, function (err, tweet) {
                    if (err) {
                        console.log(err);
                    } else {
                        user[0].tweets.push(tweet);
                        user[0].save();
                    }
                })
                params = {
                    status: 'Hey, we have bookmarked the tweet your asked for. You can check the same in your dashboard. Thank you for using our service 🤖. https://twitter.com/' + tweet.in_reply_to_screen_name + '/status/' + tweet.in_reply_to_status_id_str,
                    in_reply_to_status_id: tweet.id_str,
                    auto_populate_reply_metadata: true
                }
            }
        }).then(function () {
            T.post('statuses/update', params, function (err, data, response) {
                console.log("Stauts: " + response.statusMessage)
            })
        })
    })
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});