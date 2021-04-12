var passport = require("passport"),
    Strategy = require("passport-twitter").Strategy,
    dotenv = require("dotenv");

var func = require("../functions/functions");

dotenv.config();

var passObj = {}

passObj.initialize = passport.initialize();

passObj.session = passport.session();

passObj.login = passport.use(new Strategy({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    // requestTokenURL: 'https://api.twitter.com/oauth/request_token?x_auth_access_type=read',
    includeEmail: true,
    callbackURL: '/dashboard/auth/callback',
    proxy: true
}, function (token, tokenSecret, profile, cb) {
    func.userCreateOrUpdate(profile, cb);
}));

passObj.serializeUser = passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passObj.deserializeUser = passport.deserializeUser(function (userID, cb) {
    func.userFind(userID, cb);
});

module.exports = passObj;