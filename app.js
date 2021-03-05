var express = require("express"),
    mongoose = require("mongoose"),
    twit = require("twit"),
    passport = require("passport"),
    Strategy = require("passport-twitter").Strategy,
    session = require("express-session"),
    MongoStore = require("connect-mongo").default,
    dotenv = require("dotenv"),
    app = express();

//INITIALIZING SCHEMAS
var User = require("./models/users"),
    Tweet = require("./models/tweets");

//INITIALIZING OBJECTS
var objects = require("./objects/objects"),
    params = objects.params,
    newUser = objects.newUser,
    bmTweet = objects.bmTweet;

//INITIALIZING ROUTES
var dashboarRoutes = require("./routes/dashboard"),
    loginRoutes = require("./routes/login");

var func = require("./functions/functions");

//INITIALIZING .env
dotenv.config();

//INITIALIZING DATABASE
mongoose.connect(process.env.DATABASEURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(function () {
    console.log("Connected to DB");
}).catch(function (err) {
    console.log("ERROR:", err.message);
});

//INITIALIZING TOKENS
var T = new twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN, //tweepsbookapp
    access_token_secret: process.env.ACCESS_TOKEN_SECRET, //tweepsbookapp
    timeout_ms: 60 * 1000
});

//INITIALIZING MIDDLEWARES
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DATABASEURL }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14 //14 Days
    }
}));
app.use(passport.initialize());
app.use(passport.session());


//REQUESTS
passport.use(new Strategy({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    // requestTokenURL: 'https://api.twitter.com/oauth/request_token?x_auth_access_type=read',
    includeEmail: true,
    callbackURL: '/login/callback',
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
    });
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
            cb(err);
        });
});


//ROUTES
app.get('/', function (req, res) {
    res.send('<h1>Hi there!</>')
});

app.use('/dashboard', dashboarRoutes);

app.use('/login', loginRoutes);

app.get('/check', function (req, res) {
    if (req.isAuthenticated()) {
        res.send("<h1>You are!</>");
    } else {
        res.send("<h1>You arn't</h1>");
    }
});

app.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/');
})

app.get('/:url', function (req, res) {
    res.send('<h1>Page not found!</h1>');
});

var stream = T.stream('statuses/filter', { track: ['@tweepsbookapp bookmark'] });
stream.on('tweet', function (tweet) {
    T.get('statuses/show', { id: tweet.in_reply_to_status_id_str }, function (err, data, response) {
        bmTweet.status_id = data.id_str;
    })
    T.get('statuses/show', { id: tweet.id_str }, function (err, data, response) {
        func.addTag(data);
        User.find({ id: data.user.id_str }, function (err, user) {
            func.main(err, user, tweet)
            .then(function () {
                console.log(params)
                // T.post('statuses/update', params, function (err, data, response) {
                //     console.log("Stauts: " + response.statusMessage + " & Code: " + response.statusCode)
                // });
            })
        })
        // .then(function () {
        //     console.log(params)
        //     // T.post('statuses/update', params, function (err, data, response) {
        //     //     console.log("Stauts: " + response.statusMessage + " & Code: " + response.statusCode)
        //     // });
        // });
    });
});

app.listen(process.env.PORT, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});