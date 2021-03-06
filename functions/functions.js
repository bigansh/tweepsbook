var objects = require("../models/objects"),
    params = objects.params,
    newUser = objects.newUser,
    bmTweet = objects.bmTweet;

var Tweet = require("../models/tweets"),
    User = require("../models/users");

var func = {
    addTag: function (data) {
        bmTweet.tag = data.text.match(/\B\#\w\w+\b/g)
        if (bmTweet.tag != null) {
            bmTweet.tag = data.text.match(/\B\#\w\w+\b/g)[0];
            bmTweet.tag = bmTweet.tag.toLowerCase();
        } else {
            bmTweet.tag = null;
        }
    },
    main: function (err, user, tweet) {
        if (user.length === 0) {
            params = {
                status: 'Hey, you have not registered with us. Hence we are unable to bookmark the tweet you requested. Please register on our website to bookmark better 🤖. https://offf.to/tweepsbookapp',
                in_reply_to_status_id: tweet.id_str,
                auto_populate_reply_metadata: true
            }
        } else {
            bmTweet.id = user[0].id;
            Tweet.create(bmTweet, function (err, tweet) {
                user[0].tweets.push(tweet);
                user[0].save();
                console.log("Tweet saved.")
            })
            params = {
                status: 'Hey, we have bookmarked the tweet your asked for. You can check the same in your dashboard. Thank you for using our service 🤖. https://twitter.com/' + tweet.in_reply_to_screen_name + '/status/' + tweet.in_reply_to_status_id_str,
                in_reply_to_status_id: tweet.id_str,
                auto_populate_reply_metadata: true
            }
        }
        return Promise.resolve({ msg: 'Worked', data: params });
    },
    userCreate: function (profile, cb) {
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
    },
    userFind: function (userID, cb) {
        User.find({ id: userID })
            .then(function (user) {
                cb(null, user);
            }).catch(function (err) {
                cb(err);
            });
    }
}

module.exports = func;