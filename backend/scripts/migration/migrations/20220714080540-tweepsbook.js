import { v4 as uuidV4 } from 'uuid'

export const up = async (db) => {
	const users = await db.collection('users').find({}).toArray()

	for (const user of users) {
		const profile_id = uuidV4()

		const bookmarks = await db
			.collection('bookmarks')
			.find({ id: user.id })
			.toArray()

		for await (const bookmark of bookmarks) {
			const tags = []

			const tag = await db
				.collection('tags')
				.find({ id: bookmark.id, tag: bookmark.tag })
				.toArray()

			tags.push(tag[0]._id)

			bookmark.tag = tags

			await db
				.collection('bookmarks')
				.replaceOne({ _id: bookmark._id }, bookmark)
		}

		await db.collection('tags').updateMany(
			{ id: user.id },
			{
				$unset: {
					id: '',
				},
				$set: {
					profile_id: profile_id,
				},
			}
		)

		await db.collection('users').updateOne(
			{ id: user.id },
			{
				$rename: {
					id: 'twitter_id',
					profile: 'profile_image',
					tweets: 'bookmarks',
				},
				$set: {
					profile_id: profile_id,
					unreadCount: 10,
					importCount: { twitter: 0 },
				},
			}
		)

		await db.collection('bookmarks').updateMany(
			{ id: user.id },
			{
				$unset: {
					id: '',
				},
				$set: {
					bookmarkSource: 'twitter',
					bookmarkMethod: 'reply',
					read: false,
					share: false,
					profile_id: profile_id,
				},
				$rename: {
					status: 'twitter_status_id',
					tag: 'tags',
				},
			}
		)
	}
}

export const down = async (db) => {}
