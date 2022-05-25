const cache = require('../utils/classes/nodeCache')

const twitterAuthFlow = require('../functions/twitterAuthFlow')

/**
 * A controller to handle the requests to to login via Twitter.
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 */
const authTwitter = (req, res) => {
    const { url, state, codeVerifier } = twitterAuthFlow()

    cache.set('token', { state, codeVerifier }, 100)

    res.status(302).redirect(url)
}

module.exports = authTwitter
