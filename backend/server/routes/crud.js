const { fastify } = require('fastify')

const app = fastify()

const crudUpdate = require('../controllers/crudUpdate'),
	crudDelete = require('../controllers/crudDelete'),
	crudRead = require('../controllers/crudRead'),
	crudCreate = require('../controllers/crudCreate')

/**
 * A route that handles the CRUD requests for the saved bookmarks.
 *
 * @param {app} fastify
 * @param {*} _options
 * @param {*} done
 */
const crud = (fastify, _options, done) => {
	fastify.post(
		'/create',
		{
			onRequest: [fastify.authenticate],
		},
		crudCreate
	)
	fastify.get(
		'/read',
		{
			onRequest: [fastify.authenticate],
		},
		crudRead
	)
	fastify.patch(
		'/update',
		{
			onRequest: [fastify.authenticate],
		},
		crudUpdate
	)
	fastify.delete(
		'/delete',
		{
			onRequest: [fastify.authenticate],
		},
		crudDelete
	)

	done()
}

module.exports = crud
