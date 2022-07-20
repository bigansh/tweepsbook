const Joi = require('joi')

/**
 * A function that validates the body object to update the tags for a bookmark.
 *
 * @param {import('../models/tags')} body
 */
const tagsValidator = (body) => {
    const tags = Joi.array().items(Joi.string()).required()

    return tags.validate(body)
}

module.exports = tagsValidator
