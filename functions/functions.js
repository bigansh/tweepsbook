var dotenv = require("dotenv");

var objects = require("../models/objects"),
    params = objects.params,
    usr = objects.usr,
    bmtTag = objects.bmtTag,
    bmTweet = objects.bmTweet;

var Tweet = require("../models/tweets"),
    Tag = require("../models/tags"),
    User = require("../models/users");

var mailChimp = require("../connections/mailchimpConnect");

dotenv.config();

var func = {
    main: function (err, user, tweet) {
        if (user.length === 0) {
            params = {
                status: 'Hey, you have not registered with us. Hence we are unable to bookmark the tweet you requested. Please register on our website to bookmark better 🤖. https://tweepsbook.com',
                in_reply_to_status_id: tweet.id_str,
                auto_populate_reply_metadata: true
            }
        } else {
            bmTweet.id = user[0].id;
            bmtTag.id = bmTweet.id;
            func.tweetCreate(bmTweet, user).then(function (msg) {
                func.tagFindOrCreate(bmTweet, bmtTag, user);
            });
            params = {
                status: 'Hey, we have bookmarked the tweet your asked for. You can check the same in your dashboard. Thank you for using our service 🤖. https://twitter.com/' + tweet.in_reply_to_screen_name + '/status/' + tweet.in_reply_to_status_id_str,
                in_reply_to_status_id: tweet.id_str,
                auto_populate_reply_metadata: true
            }
        }
        return Promise.resolve({ data: params });
    },
    addTag: function (data) {
        bmTweet.tag = data.text.match(/\B\#\w\w+\b/g)
        if (bmTweet.tag != null) {
            bmTweet.tag = data.text.match(/\B\#\w\w+\b/g)[0];
            bmTweet.tag = bmTweet.tag.toLowerCase();
        } else {
            bmTweet.tag = null;
        }
    },
    addSubscriber: function (emailAddress, fullName) {
        mailChimp.post('/lists/' + process.env.MAILCHIMP_LIST_ID + '/members', {
            update_existing: true,
            email_address: emailAddress,
            merge_fields: {
                'NAME': fullName
            },
            status: 'subscribed'
        }, function (results) {
            console.log("Status: " + results.title);
        })
    },
    userCreateOrUpdate: function (profile, cb) {
        usr.id = profile.id;
        usr.email = profile.emails[0].value;
        usr.name = profile.displayName;
        usr.profile = profile.photos[0].value;
        User.find({ id: profile.id }, function (err, user) {
            if (user.length === 0) {
                User.create(usr);
                console.log("User created: " + usr.email);
                func.addSubscriber(usr.email, usr.name);
            } else {
                User.findOneAndUpdate({ id: profile.id }, usr, {
                    new: true
                }, function(err, user){
                    console.log("User updated: " + user.email);
                });
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
    },
    tagFindOrCreate: function (tweet, tag, user) {
        Tag.find({ tag: tweet.tag, id: tweet.id }, function (err, foundTag) {
            if (foundTag.length === 0) {
                tag.tag = tweet.tag;
                func.tagCreate(tag, user);
            }
        })

    },
    tagCreate: function (tag, user) {
        Tag.create(tag, function (err, tag) {
            user[0].tags.push(tag);
            user[0].save();
            console.log("Tag created: " + tag.tag);
        })
    },
    tweetCreate: function (tweet, user) {
        return new Promise(function (resolve) {
            Tweet.create(tweet, function (err, tweet) {
                user[0].tweets.push(tweet);
                user[0].save();
                console.log("Tweet saved: " + tweet.status)
                resolve();
            })
        })

    }
}

module.exports = func;