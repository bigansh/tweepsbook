const { TweetEntityHashtagV2, HashtagEntityV1 } = require('twitter-api-v2')

const tagFindOrCreate = require('./tagFindOrCreate'),
	bookmarkCheckOrCreate = require('./bookmarkCheckOrCreate')

/**
 * A function to bookmark a tweet with the specified tags.
 *
 * @param {import('../utils/schemas/User').UserDocument} user
 * @param {String} requestedTweetId
 * @param {String} bookmarkMethod
 * @param {TweetEntityHashtagV2[] | HashtagEntityV1[]} tags
 */
const bookmark = async (
	user,
	requestedTweetId,
	bookmarkMethod,
	tags = undefined
) => {
	try {
		const unreadBookmarks = user.bookmarks.filter(
			(bookmark) => bookmark.read === false
		).length

		if (user.unreadCount >= unreadBookmarks && user.unreadCount !== 0)
			return false

		/**
		 * @type {import('../utils/schemas/Tag').TagDocument[]}
		 */
		let bookmarkTags = []

		if (tags.length)
			for await (const { text, tag } of tags) {
				const tagProvided = text || tag

				const savedTag = await tagFindOrCreate(tagProvided, user)

				bookmarkTags.push(savedTag)
			}

		const savedBookmark = await bookmarkCheckOrCreate(
			user.profile_id,
			requestedTweetId,
			bookmarkMethod,
			bookmarkTags
		)

		user.bookmarks.push(savedBookmark)

		await user.save()

		return true
	} catch (error) {
		console.log(error)
	}
}

module.exports = bookmark
