const { fastify } = require('fastify')

const app = fastify()

const indexGet = require('../controllers/indexGet')

/**
 * A route that handles the index requests.
 *
 * @param {app} fastify
 * @param {*} _options
 * @param {*} done
 */
const index = (fastify, _options, done) => {
	fastify.get('/', indexGet)

	done()
}

module.exports = index
