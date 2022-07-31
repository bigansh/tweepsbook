const { fastify } = require('fastify')

const app = fastify()

const utilsEmail = require('../controllers/utilsEmail')

/**
 * A route that handles the index requests.
 *
 * @param {app} fastify
 * @param {*} _options
 * @param {*} done
 */
const index = (fastify, _options, done) => {
	fastify.post(
		'/email',
		{
			onRequest: [fastify.verify],
		},
		utilsEmail
	)

	done()
}

module.exports = index
