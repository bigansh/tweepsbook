require('dotenv').config()

const { TwitterApi } = require('twitter-api-v2')
const {
	TwitterApiRateLimitPlugin,
} = require('@twitter-api-v2/plugin-rate-limit')

const rateLimitPlugin = new TwitterApiRateLimitPlugin()

const twtrClient = new TwitterApi(
	{
		appKey: process.env.CONSUMER_KEY,
		appSecret: process.env.CONSUMER_SECRET,
		accessToken: process.env.ACCESS_TOKEN,
		accessSecret: process.env.ACCESS_TOKEN_SECRET,
	},
	{
		plugins: [rateLimitPlugin],
	}
)

module.exports = twtrClient
