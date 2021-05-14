var mongoose = require('mongoose')

var tagsSchemma = mongoose.Schema({
	tag: String,
	id: String,
})

module.exports = mongoose.model('Tag', tagsSchemma)
