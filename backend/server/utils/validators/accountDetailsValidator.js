const Joi = require('joi')

/**
 * A function that validates the body object to update the account details.
 * 
 * @param {import('../models/accountDetails')} body 
 */
const accountDetailsValidator = (body) => {
    const model = Joi.object({
        email: Joi.string(),
        name: Joi.string(),
        unreadCount: Joi.number(),
    })

    return model.validate(body)
}

module.exports = accountDetailsValidator
