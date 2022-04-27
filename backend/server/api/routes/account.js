const { fastify } = require('fastify')

const app = fastify()

/**
 * A route that handles the requests for account mutations.
 *
 * @param {app} fastify
 * @param {*} _options
 * @param {*} done
 */
const account = (fastify, _options, done) => {
	fastify.get(
		'/read',
		{
			onRequest: [fastify.authenticate],
		},
		getAccount
	)
	fastify.patch(
		'update',
		{
			onRequest: [fastify.authenticate],
		},
		updateAccount
	)
	fastify.delete(
		'/delete',
		{
			onRequest: [fastify.authenticate],
		},
		deleteAccount
	)

	done()
}

module.exports = account
