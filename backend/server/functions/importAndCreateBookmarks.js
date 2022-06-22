/**
 * @type {import('../utils/schemas/User').UserModel}
 */
const User = require('../utils/schemas/User'),
	/**
	 * @type {import('../utils/schemas/Bookmark').BookmarkModel}
	 */
	Bookmark = require('../utils/schemas/Bookmark')

const mixpanel = require('../utils/auth/mixpanelConnect')

const importValidation = require('./importValidation')

/**
 * A function that imports bookmarks from a user's account & adds it to the DB.
 *
 * @param {import('twitter-api-v2').TwitterApi} userTwtrClient
 * @param {String} profile_id
 */
const importAndCreateBookmarks = async (
	userTwtrClient = undefined,
	profile_id
) => {
	try {
		if (userTwtrClient) {
			const user = await User.findOne({
				profile_id: profile_id,
			})
				.select(['bookmarks', 'importCount', 'unreadCount'])
				.exec()

			const importedBookmarks = await userTwtrClient.v2.bookmarks()

			let importedBookmarksCount = 0

			for await (const tweet of importedBookmarks) {
				await importValidation('twitter', user)

				const foundBookmark = await Bookmark.findOne({
					profile_id: profile_id,
					twitter_status_id: tweet.id,
				})
					.select(['_id'])
					.lean()
					.exec()

				if (!foundBookmark) {
					const createdBookmark = await Bookmark.create({
						profile_id: profile_id,
						twitter_status_id: tweet.id,
						content: tweet.text,
						bookmarkSource: 'twitter',
					})

					user.bookmarks.push(createdBookmark)

					mixpanel.track('Create bookmark', {
						distinct_id: profile_id,
						bookmarkId: createdBookmark._id,
						bookmark_type: 'Twitter',
						bookmark_method: 'Import',
					})

					importedBookmarksCount++
				}
			}

			user.importCount.twitter++

			await user.save()

			mixpanel.track('Import bookmarks', {
				distinct_id: profile_id,
				import_type: 'Twitter',
			})

			return { numberOfImportedBookmarks: importedBookmarksCount }
		}
	} catch (error) {
		throw new Error(error)
	}
}

module.exports = importAndCreateBookmarks
