const { fastify } = require('fastify')

const app = fastify()

const updateBookmark = require('../controllers/updateBookmark'),
	deleteBookmark = require('../controllers/deleteBookmark'),
	getBookmarks = require('../controllers/getBookmarks')

/**
 * A route that handles the CRUD requests for the saved bookmarks.
 *
 * @param {app} fastify
 * @param {*} _options
 * @param {*} done
 */
const crud = (fastify, _options, done) => {
	fastify.get('/read', getBookmarks)
	fastify.post('/update', updateBookmark)
	fastify.delete('/delete', deleteBookmark)

	done()
}

module.exports = crud
