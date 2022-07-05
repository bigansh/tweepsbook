const twtrClient_o1 = require('../utils/auth/oauth1.0a')

/**
 * A function that replies to the request.
 *
 * @param {String} replyTo_id
 * @param {Boolean} user
 */
const reply = async (replyTo_id, user = undefined) => {
	try {
		if (user)
			await twtrClient_o1.v2.reply(
				'Hey, the tweet that you requested has been successfully bookmarked. You can take a look at all your bookmarked tweets on your dashboard.',
				replyTo_id
			)
		else if (!user)
			await twtrClient_o1.v2.reply(
				'Hey, we are unable to process your request as you are not a registered user or you have reached the unread bookmarks threshold. Please create a new account and try again or read some of your bookmarks.',
				replyTo_id
			)
	} catch (error) {
		console.log(error)
	}
}

module.exports = reply
