require('dotenv').config()

const rules = {
	add: [
		{
			value: `@tweepsbookcom ${process.env.BOOKMARK} has:mentions -from:@twpsbkbot`,
			tag: 'bookmark',
		},
		{
			value: `@tweepsbookcom ${process.env.UNROLL} has:mentions -from:@twpsbkbot`,
			tag: 'unroll',
		},
	],
}

module.exports = rules
