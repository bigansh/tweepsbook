const mongoose = require('mongoose')

const tweetSchema = mongoose.Schema({
	status_id: BigInt,
	profile_id: String,
	tags: [{ tag: String }],
})

module.exports = mongoose.model('Tweet', tweetSchema)