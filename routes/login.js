var express = require("express"),
    router = express.Router(),
    passport = require("passport");

router.get('/', passport.authenticate('twitter'));

router.get('/callback', passport.authenticate('twitter', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/');
    }
);

module.exports = router;