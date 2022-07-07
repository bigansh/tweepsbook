require('dotenv').config()

const { EDirectMessageEventTypeV1 } = require('twitter-api-v2')

const twtrClient_o1 = require('../utils/auth/oauth1.0a')

const nodeCache = require('../utils/classes/nodeCache')

const userFind = require('./userFind'),
	dmReply = require('./dmReply'),
	bookmark = require('./bookmark')

/**
 * A function that streams the DMs received.
 */
const dmStream = () => {
	console.log('DM stream online!')

	setInterval(async () => {
		try {
			let dmEvents = await twtrClient_o1.v1.listDmEvents()

			if (!dmEvents.events.length) return

			const cache = nodeCache.take('lastMessageId')

			if (!cache) {
				nodeCache.set('lastMessageId', {
					messageId: dmEvents.events[0].id,
				})
			}

			if (cache && cache.messageId !== dmEvents.events[0].id) {
				const lastMessageIndex = dmEvents.events.findIndex(
					(event) => event.id === cache.messageId
				)

				dmEvents.events.splice(lastMessageIndex)

				nodeCache.set('lastMessageId', {
					messageId: dmEvents.events[0].id,
				})
			} else if (cache && cache.messageId === dmEvents.events[0].id) {
				nodeCache.set('lastMessageId', {
					messageId: dmEvents.events[0].id,
				})

				return
			}

			for (const event of dmEvents) {
				if (
					event.type === EDirectMessageEventTypeV1.Create &&
					event.message_create.sender_id != process.env.TWITTER_ID_BOT
				) {
					const user = await userFind(event.message_create.sender_id)

					if (user) {
						let state

						if (
							event.message_create.message_data.text.includes(
								process.env.BOOKMARK
							)
						) {
							state = await bookmark(
								user,
								event.message_create.message_data.entities.urls[0].expanded_url.match(
									/[0-9]*$/i
								)[0],
								'DM',
								event.message_create.message_data.entities
									.hashtags
							)

							dmReply(event.message_create.sender_id, state)
						}
					} else if (!user)
						dmReply(event.message_create.sender_id, false)
				}
			}

			nodeCache.set('lastMessageId', {
				messageId: dmEvents.events[0].id,
			})
		} catch (error) {
			console.log(error)
		}
	}, 1000 * 60)
}

module.exports = dmStream
