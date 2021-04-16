var express = require("express"),
    router = express.Router(),
    User = require("../models/users"),
    Tweet = require("../models/tweets"),
    passport = require("passport"),
    isFetch= require("../middlewares/fetchMiddleware"),
    isAuth = require("../middlewares/authMiddlware");

router.get('/', isAuth, function (req, res) {
    User.find({ id: req.user[0].id }).populate("tweets").populate("tags").exec(function (err, user) {
        res.render("dashboard", { user: JSON.stringify(user), userImage: user[0].profile, userName: user[0].name });
    });
});

router.get('/json', isAuth, isFetch, function (req, res) {
    User.find({ id: req.user[0].id }).populate("tweets").populate("tags").exec(function (err, user) {
        res.send(user);
    });
});

router.get('/login', function (req, res) {
    res.render("signin");
});

router.get('/auth', passport.authenticate('twitter'));

router.get('/auth/callback', passport.authenticate('twitter', { failureRedirect: '/error' }),
    function (req, res) {
        res.redirect('/dashboard/authenticated');
    }
);

router.get('/authenticated', function (req, res) {
    res.redirect('/dashboard');
});

router.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/');
});

router.get("/:url", function (req, res) {
    res.redirect("/dashboard");
});

module.exports = router;