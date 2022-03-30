require('dotenv').config()

const tweetStream = require('./functions/tweetStream'),
    dmStream = require('./functions/dmStream')

tweetStream()
