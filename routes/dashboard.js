var express = require("express"),
    router = express.Router(),
    User = require("../models/users"),
    Tweet = require("../models/tweets"),
    passport = require("passport"),
    isAuth = require("../middlewares/authMiddlware");

router.get('/', isAuth, function (req, res) {
    User.find({ id: req.user[0].id }).populate("tweets").populate("tags").exec(function (err, user) {
        // res.render("dashboard", {user: JSON.stringify(user.tags), newUser: user});
        res.send(user);
    });
});

router.get('/authenticate', function (req, res) {
    res.redirect('/dashboard');
});

router.get('/login', passport.authenticate('twitter'));

router.get('/login/callback', passport.authenticate('twitter', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/dashboard/authenticate');
    }
);

router.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/');
});

router.get("/:url", function (req, res) {
    res.redirect("/dashboard");
});

module.exports = router;