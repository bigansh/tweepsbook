require('dotenv').config()

/**
 * A function that exports the rules for the stream.
 */

const rules = {
	add: [
		{
			value: `@tweepsbookcom ${process.env.KEYWORD} has:hashtags has:mentions`,
			tag: 'request',
		},
	],
}

module.exports = rules
