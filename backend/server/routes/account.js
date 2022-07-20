const { fastify } = require('fastify')

const app = fastify()

const accountUpdate = require('../controllers/accountUpdate'),
	accountDelete = require('../controllers/accountDelete'),
	accountGet = require('../controllers/accountGet')

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
		accountGet
	)
	fastify.patch(
		'/update',
		{
			onRequest: [fastify.authenticate],
		},
		accountUpdate
	)
	fastify.delete(
		'/delete',
		{
			onRequest: [fastify.authenticate],
		},
		accountDelete
	)

	done()
}

module.exports = account
