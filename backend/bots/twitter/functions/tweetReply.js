const { TwitterApi } = require('twitter-api-v2')

/**
 * A function that replies to the request.
 *
 * @param {TwitterApi} twtrClient
 * @param {BigInt} replyTo_id
 * @param {Boolean} user
 */

const reply = async (twtrClient, replyTo_id, user = undefined) => {
	try {
		if (user)
			await twtrClient.v2.reply(
				'Hey, the tweet that you requested has been successfully bookmarked. You can take a look at all your bookmarked tweets on your dashboard.',
				replyTo_id
			)
		else
			await twtrClient.v2.reply(
				'Hey, we are unable to process your request as you are not a registered user. Please create a new account and try again.',
				replyTo_id
			)
	} catch (error) {
		console.log('ERROR: ', error)
	}
}

module.exports = reply
