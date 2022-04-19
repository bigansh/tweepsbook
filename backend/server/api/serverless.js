require('dotenv').config()

const { fastify } = require('fastify')

const app = fastify()

app.register(require('./app'))

export default async (req, res) => {
	await app.ready()
    
	app.server.emit('request', req, res)
}
