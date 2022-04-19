const mongoose = require('mongoose')

const tagSchema = mongoose.Schema({
	tag: String,
	profile_id: String,
})

module.exports = mongoose.model('Tag', tagSchema)
