const Joi = require('joi')

/**
 * A function that validates the body object to change the archive status of a bookmark.
 *
 * @param {import('../models/archiveStatus')} body
 */
const archiveStatus = (body) => {
    const archiveStatus = Joi.boolean().required()

    return archiveStatus.validate(body)
}

module.exports = archiveStatus
