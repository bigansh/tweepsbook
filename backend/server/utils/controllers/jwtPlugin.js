require('dotenv').config()

const { fastify } = require('fastify'),
	fastifyPlugin = require('fastify-plugin')

const app = fastify()

// TODO Write JWT plugin.

/**
 * A plugin that adds JWT authentication.
 */
const jwtAuth = fastifyPlugin(
	/**
	 * @param {app} fastify
	 * @param {*} _options
	 */
	async (fastify, _options) => {
		fastify.register(require('fastify-jwt'), {
			secret: process.env.SECRET_JWT,
		})

		fastify.decorate(
			'authenticate',
			/**
			 * @param {import('fastify').FastifyRequest} req
			 * @param {import('fastify').FastifyReply} res
			 */
			async (req, res) => {
				try {
					await req.jwtVerify()
				} catch (error) {}
			}
		)
	}
)

module.exports = jwtAuth
