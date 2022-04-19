const { fastify } = require('fastify')

const app = fastify()

const googleAuth = require('../controllers/googleAuth'),
    twitterAuth = require('../controllers/twitterAuth'),
    loginAuth = require('../controllers/loginAuth'),
    signUpAuth = require('../controllers/signUpAuth')

/**
 * A route that handles the auth requests for login & sign ups.
 * 
 * @param {app} fastify 
 * @param {*} _options 
 * @param {*} done 
 */
const auth = (fastify, _options, done) => {
    fastify.get('/twitter', twitterAuth)
    fastify.get('google', googleAuth)
    fastify.post('/login', loginAuth)
    fastify.post('/sign-up', signUpAuth)

    done()
}

module.exports = auth