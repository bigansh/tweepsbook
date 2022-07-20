const mongoose = require('mongoose')

const bookmarkSchema = new mongoose.Schema(
	{
		twitter_status_id: String,
		discord_message_id: String,
		reddit_post_id: String,
		pinterest_post_id: String,
		bookmarkSource: String,
		bookmarkMethod: String,
		profile_id: String,
		read: { type: Boolean, default: false },
		share: { type: Boolean, default: false },
		tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
		notes: String,
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Bookmark', bookmarkSchema)
