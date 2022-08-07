require('dotenv').config()

const authEmail = require('../functions/authEmail')

const accountDetailsValidator = require('../utils/validators/accountDetailsValidator')

/**
 * A controller to handle the email requests.
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 */
const utilsEmail = async (req, res) => {
	try {
		const { queryType } = req.query

		let data

		switch (queryType) {
			case 'authEmail':
				if (req.body.accountDetails) {
					const validatedDetails = accountDetailsValidator(
						req.body.accountDetails
					)

					if (validatedDetails.error)
						throw new Error(validatedDetails.error.message)

					data = await authEmail(validatedDetails.value.email)
				}

				break
		}

		res.status(200).send(data)
	} catch (error) {
		throw error
	}
}

module.exports = utilsEmail
