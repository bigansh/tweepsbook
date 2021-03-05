var express = require("express"),
    router = express.Router(),
    User = require("../models/users"),
    Tweet = require("../models/tweets"),
    isAuth = require("../middlewares/authMiddlware");

router.get('/', isAuth, function (req, res) {
    User.find({ id: req.user[0].id }).populate("tweets").exec(function (err, user) {
        res.send(user);
    });
});

module.exports = router;