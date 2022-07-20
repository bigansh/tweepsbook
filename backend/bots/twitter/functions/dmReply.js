const twtrClient_o1 = require('../utils/auth/oauth1.0a')

/**
 * A function that replies to a request via a DM.
 *
 * @param {String} replyTo_id
 * @param {Boolean} state
 */
const dmReply = async (replyTo_id, state = undefined) => {
	try {
		if (state)
			await twtrClient_o1.v1.sendDm({
				recipient_id: replyTo_id,
				text: 'Hey, the tweet that you requested has been successfully bookmarked. You can take a look at all your bookmarked tweets on your dashboard.',
			})
		else if (!state)
			await twtrClient_o1.v1.sendDm({
				recipient_id: replyTo_id,
				text: 'Hey, we are unable to process your request as you are not a registered user or you have reached the unread bookmarks threshold. Please create a new account and try again or read some of your bookmarks.',
			})
	} catch (error) {
		console.log(error)
	}
}

module.exports = dmReply
