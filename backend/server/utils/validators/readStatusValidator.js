const Joi = require('joi')

/**
 * A function that validates the body object to change the read status of a bookmark.
 *
 * @param {import('../models/archiveStatus')} body
 */
const readStatus = (body) => {
    const readStatus = Joi.boolean().required()

    return readStatus.validate(body)
}

module.exports = readStatus
