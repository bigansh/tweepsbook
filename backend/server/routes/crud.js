const { fastify } = require('fastify')

const app = fastify()

const curdUpdate = require('../controllers/curdUpdate'),
	curdDelete = require('../controllers/curdDelete'),
	curdRead = require('../controllers/curdRead'),
	crudCreate = require('../controllers/curdCreate')

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
		curdRead
	)
	fastify.patch(
		'/update',
		{
			onRequest: [fastify.authenticate],
		},
		curdUpdate
	)
	fastify.delete(
		'/delete',
		{
			onRequest: [fastify.authenticate],
		},
		curdDelete
	)

	done()
}

module.exports = crud
