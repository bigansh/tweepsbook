const { fastify } = require('fastify')

const app = fastify()

const fetchRead = require('../controllers/fetchRead')

/**
 * A route that handles the public fetch requests for the bookmarks.
 *
 * @param {app} fastify
 * @param {*} _options
 * @param {*} done
 */
const fetch = (fastify, _options, done) => {
	fastify.get(
		'/',
		{
			onRequest: [fastify.verify],
		},
		fetchRead
	)

	done()
}

module.exports = fetch
