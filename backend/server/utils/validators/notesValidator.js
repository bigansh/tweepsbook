const Joi = require('joi')

/**
 * A function that validates the body object to change the notes of a bookmark.
 *
 * @param {import('../models/shareStatus')} body
 */
const notes = (body) => {
	const notes = Joi.string().required()

	return notes.validate(body)
}

module.exports = notes
