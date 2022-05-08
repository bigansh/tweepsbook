require('dotenv').config()

const { TwitterApi } = require('twitter-api-v2')
const {
	TwitterApiRateLimitPlugin,
} = require('@twitter-api-v2/plugin-rate-limit')

const rateLimitPlugin = new TwitterApiRateLimitPlugin()

const twtrClient = new TwitterApi(
	{
		clientId: process.env.CLIENT_ID_TWITTER_MAIN,
		clientSecret: process.env.CLIENT_SECRET_TWITTER_MAIN,
	},
	{
		plugins: [rateLimitPlugin],
	}
)

module.exports = twtrClient
