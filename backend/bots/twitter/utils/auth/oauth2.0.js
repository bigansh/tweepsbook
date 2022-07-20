require('dotenv').config()

const { TwitterApi } = require('twitter-api-v2')
const {
	TwitterApiRateLimitPlugin,
} = require('@twitter-api-v2/plugin-rate-limit')

const rateLimitPlugin = new TwitterApiRateLimitPlugin()

const twtrClient = new TwitterApi(process.env.BEARER_TOKEN_TWITTER_MAIN, {
	plugins: [rateLimitPlugin],
})

module.exports = twtrClient
