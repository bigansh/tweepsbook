require('dotenv').config()

const axios = require('axios').default

/**
 * A function that sends an email for authentication.
 *
 * @param {String} email
 */
const authEmail = async (email) => {
	try {
		const response = await axios.post(
			`https://api.mailmodo.com/api/v1/triggerCampaign/${process.env.CAMPAIGN_ID_MAILMODO}`,
			{
				email: email,
				campaign_data: {
					authUrl: `${process.env.HOST}/auth/twitter?authorization=${process.env.SECRET_AUTH}&email=${email}`,
				},
			},
			{
				headers: {
					'Content-Type': 'application/json',
					mmApiKey: process.env.KEY_MAILMODO,
				},
			}
		)

		return response.data
	} catch (error) {
		throw error
	}
}

module.exports = authEmail
