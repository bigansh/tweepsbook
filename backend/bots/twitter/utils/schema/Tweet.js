const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
	status_id: String,
	profile_id: String,
	read: { type: Boolean, default: false },
	archived: { type: Boolean, default: false },
	tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
})

module.exports = mongoose.model('Tweet', tweetSchema)
