require('dotenv').config()

const { fastify } = require('fastify'),
	fastifyPlugin = require('fastify-plugin')

const app = fastify()

/**
 * A plugin that authenticates the auth routes.
 */
const authPlugin = fastifyPlugin(
	/**
	 *
	 * @param {app} fastify
	 * @param {*} _options
	 * @param {*} next
	 */
	(fastify, _options, next) => {
		fastify.decorate(
			'verify',
			/**
			 * @param {import('fastify').FastifyRequest} req
			 * @param {import('fastify').FastifyReply} res
			 */
			(req, res, next) => {
				try {
					if (!req.headers['authorization'])
						throw new Error('Client authentication required.')

					const authToken = req.headers['authorization'].split(' ')[1]

					if (authToken === process.env.SECRET_AUTH) next()
					else
						throw new Error(
							'Client not authorized to access this route.'
						)
				} catch (error) {
					throw new Error(error)
				}
			}
		)

		next()
	}
)

module.exports = authPlugin
