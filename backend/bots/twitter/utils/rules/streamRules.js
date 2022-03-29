require('dotenv').config()

/**
 * A function that exports the rules for the stream.
 */

const rules = {
	add: [
		{
			value: `@tweepsbookcom ${process.env.BOOKMARK} has:mentions`,
			tag: 'bookmark',
		},
		{
			value: `@tweepsbookcom ${process.env.UNROLL} has:mentions`,
			tag: 'unroll'
		}
	],
}

module.exports = rules
