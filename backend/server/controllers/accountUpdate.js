const updateAccountDetails = require('../functions/updateAccountDetails')

const accountDetailsValidator = require('../utils/validators/accountDetailsValidator')

/**
 * A controller to handle the requests to update the details of the account.
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 */
const accountUpdate = async (req, res) => {
    try {
        const { queryType } = req.query

        const { profile_id } = req.user

        let data

        switch (queryType) {
            case 'accountDetails':
                if (req.body.accountDetails) {
                    const validatedDetails = accountDetailsValidator(
                        req.body.accountDetails
                    )

                    if (validatedDetails.error)
                        throw new Error(validatedDetails.error.message)

                    data = await updateAccountDetails(
                        profile_id,
                        validatedDetails.value
                    )
                }
        }

        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
}

module.exports = accountUpdate
