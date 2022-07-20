const Joi = require('joi')

/**
 * A function that validates the body object to change the share status of a bookmark.
 *
 * @param {import('../models/shareStatus')} body
 */
const shareStatus = (body) => {
	const shareStatus = Joi.boolean().required()

	return shareStatus.validate(body)
}

module.exports = shareStatus
