require('dotenv').config()

const dbConnect = require('./utils/auth/mongoConnect')

const tweetStream = require('./functions/tweetStream'),
    dmStream = require('./functions/dmStream')

dbConnect()

tweetStream()
