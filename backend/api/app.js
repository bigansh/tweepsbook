require('dotenv').config()

const { fastify } = require('fastify')

const app = fastify()

app.register(require('middie')).then(() => {})

app.listen(process.env.PORT, () => {
	console.log(`Listening on ${process.env.PORT}`)
})
