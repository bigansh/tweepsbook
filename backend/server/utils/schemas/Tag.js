const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema(
	{
		tag: String,
		profile_id: String,
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Tag', tagSchema)
