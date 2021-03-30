var express = require("express"),
    dotenv = require("dotenv"),
    app = express();

//INITIALIZING SCHEMAS
var User = require("./models/users");

//DEFINING MIDDLWARES
var pass = require("./middlewares/passMiddlware"),
    sess = require("./middlewares/sessMiddleware");

//INITIALIZING OBJECTS
var objects = require("./models/objects"),
    bmTweet = objects.bmTweet;

//INITIALIZING ROUTES
var dashboardRoute = require("./routes/dashboard");

//INITIALIZING FUNCTIONS
var func = require("./functions/functions");

//INITIALIZING CONNECTS
var mongo = require("./connections/mongoConnect"),
    twit = require("./connections/tokenConnect");

//INITIALIZING TOKENS
var T = twit;

//INITIALIZING .env
dotenv.config();

//CONNECTING DATABASE
mongo.connect;

//INITIALIZING MIDDLEWARES
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(sess.session);
app.use(pass.initialize);
app.use(pass.session);

//USING PASSPORT
pass.login;
pass.serializeUser;
pass.deserializeUser;

//ROUTES
app.get('/', function (req, res) {
    res.render("index");
});

app.use('/dashboard', dashboardRoute);

app.get('/privacy', function (req, res) {
    res.render("privacy");
});

app.get('/:url', function (req, res) {
    res.redirect("/");
});

//CAPTURING AND SAVING TWEET
var stream = T.stream('statuses/filter', { track: ['@tweepsbookcom testing'] });
stream.on('tweet', function (tweet) {
    T.get('statuses/show', { id: tweet.in_reply_to_status_id_str }, function (err, data, response) {
        bmTweet.status = data.id_str;
        T.get('statuses/show', { id: tweet.id_str }, function (err, data, response) {
            func.addTag(data);
            User.find({ id: data.user.id_str }, function (err, user) {
                func.main(err, user, tweet).then(function (params) {
                    T.post('statuses/update', params.data, function (err, Data, response) {
                        console.log("Stauts: " + response.statusMessage)
                    });
                });
            });
        });
    })
});

app.listen(process.env.PORT, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});