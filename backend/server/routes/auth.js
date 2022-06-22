const { fastify } = require('fastify')

const app = fastify()

const authGoogle = require('../controllers/authGoogle'),
	authTwitter = require('../controllers/authTwitter'),
	authLogin = require('../controllers/authLogin'),
	authSignup = require('../controllers/authSignup'),
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
		// {
		// 	onRequest: [fastify.verify],
		// },
		authTwitter
	)
	// fastify.get('/google', authGoogle)
	// fastify.post('/login', authLogin)
	// fastify.post('/sign-up', authSignup)

	done()
}

module.exports = auth
