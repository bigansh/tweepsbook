require('dotenv').config()

const { EDirectMessageEventTypeV1 } = require('twitter-api-v2')

const twtrClient_o1 = require('../utils/auth/oauth1.0a')

const userFind = require('./userFind'),
	dmReply = require('./dmReply'),
	bookmark = require('./bookmark')

// ! Create a stream pipe of GET requests.

/**
 * A function that streams the DMs received.
 */
const dmStream = async () => {
	try {
		const dmEvent = await twtrClient_o1.v1.listDmEvents()

		console.log('DM stream online!')

		for await (const event of dmEvent) {
			if (
				event.type === EDirectMessageEventTypeV1.Create &&
				event.message_create.sender_id != process.env.TWITTER_ID_BOT
			) {
				const user = await userFind(event.message_create.sender_id)

				console.log(event.message_create)

				if (user) {
					let state

					if (
						event.message_create.message_data.text.includes(
							process.env.BOOKMARK
						)
					)
						state = await bookmark(
							user,
							event.message_create.message_data.entities.urls[0].expanded_url.match(
								/[0-9]*$/i
							)[0],
							await twtrClient_o1.v1
								.singleTweet(
									event.message_create.message_data.entities.urls[0].expanded_url.match(
										/[0-9]*$/i
									)[0]
								)
								.then((tweet) => tweet.full_text),
							'DM',

							event.message_create.message_data.entities.hashtags
						)

					dmReply(event.message_create.sender_id, state)
				} else if (!user) dmReply(event.message_create.sender_id, false)
			}
		}
	} catch (error) {
		console.log('ERROR:', error)
	}
}

module.exports = dmStream
