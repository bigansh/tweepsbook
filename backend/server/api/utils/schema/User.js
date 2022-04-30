const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	email: String,
	profile_image: String,
	name: String,
	profile_id: String,
	twitter_id: String,
	twitter_auth_tokens: { accessToken: String, refreshToken: String },
	unreadCount: { type: Number, default: 100 },
	tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
	tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
})

module.exports = mongoose.model('User', userSchema)
