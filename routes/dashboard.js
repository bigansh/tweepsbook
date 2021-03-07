var express = require("express"),
    router = express.Router(),
    User = require("../models/users"),
    Tweet = require("../models/tweets"),
    passport = require("passport");
    isAuth = require("../middlewares/authMiddlware");

router.get('/', isAuth, function (req, res) {
    User.find({ id: req.user[0].id }).populate("tweets").exec(function (err, user) {
        res.send(user);
    });
});

router.get('/login', passport.authenticate('twitter'));

router.get('/login/callback', passport.authenticate('twitter', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/dashboard');
    }
);

router.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/');
})

router.get('/check', function (req, res) {
    if (req.isAuthenticated()) {
        res.send("<h1>You are!</>");
    } else {
        res.send("<h1>You arn't</h1>");
    }
});

router.get("/:url", function(req, res){
    res.redirect("/dashboard");
});

module.exports = router;