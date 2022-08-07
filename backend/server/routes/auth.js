const { fastify } = require('fastify')

const app = fastify()

const authTwitter = require('../controllers/authTwitter'),
	authCallback = require('../controllers/authCallback')

/**
 * A route that handles the auth requests for login & sign ups.
 *
 * @param {app} fastify
 * @param {*} _options
 * @param {*} done
 */
const auth = (fastify, _options, done) => {
	fastify.get('/callback', authCallback)
	fastify.get(
		'/twitter',
		{
			onRequest: [fastify.verify],
		},
		authTwitter
	)

	done()
}

module.exports = auth
