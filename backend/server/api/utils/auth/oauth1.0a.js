require('dotenv').config()

const { TwitterApi } = require('twitter-api-v2')
const {
	TwitterApiRateLimitPlugin,
} = require('@twitter-api-v2/plugin-rate-limit')

const rateLimitPlugin = new TwitterApiRateLimitPlugin()

const twtrClient = new TwitterApi(
	{
		appKey: process.env.CONSUMER_KEY_TWITTER_MAIN,
		appSecret: process.env.CONSUMER_SECRET_TWITTER_MAIN,
		accessToken: process.env.ACCESS_TOKEN_TWITTER_BOT,
		accessSecret: process.env.ACCESS_TOKEN_SECRET_TWITTER_BOT,
	},
	{
		plugins: [rateLimitPlugin],
	}
)

module.exports = twtrClient
