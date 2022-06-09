const sendgrid = require('../utils/auth/sendgridConnect')

/**
 * A function that updates the email notification preferences of a particular user.
 *
 * @param {String} profile_id
 * @param {String} updateType
 * @param {Boolean} updateTypeStatus
 */
const updateEmailNotifications = async (
	profile_id,
	updateType,
	updateTypeStatus
) => {
	try {
		if (updateType === 'reminderEmails') {
			if (updateTypeStatus) {
                
			} else {
			}
		}

		if (updateType === 'bookmarkEmails') {
			if (updateTypeStatus) {
			} else {
			}
		}
	} catch (error) {
		throw new Error(error, {
			statusCode: 500,
		})
	}
}

module.exports = updateEmailNotifications
