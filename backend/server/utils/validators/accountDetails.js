const Joi = require('joi')

/**
 * A function that validates the body object to update the account details.
 * 
 * @param {import('../models/accountDetails')} body 
 */
const validateAccountDetails = (body) => {
    const model = Joi.object({
        email: Joi.string().required(),
        name: Joi.string().required(),
        unreadCount: Joi.number().required(),
    })

    return model.validate(body)
}
