const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	email: String,
	profile_image: String,
	name: String,
    profile_id: String,
	twitter_id: BigInt,
	tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
	tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
})

module.exports = mongoose.model('User', userSchema)
