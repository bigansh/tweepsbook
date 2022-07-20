const { fastify } = require('fastify')

const app = fastify()

const indexRead = require('../controllers/indexRead')

/**
 * A route that handles the index requests.
 *
 * @param {app} fastify
 * @param {*} _options
 * @param {*} done
 */
const index = (fastify, _options, done) => {
	fastify.get('/', indexRead)

	done()
}

module.exports = index
