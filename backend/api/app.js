require('dotenv').config()

const { fastify } = require('fastify')

const mongoConnect = require('./utils/auth/mongoConnect')

const app = fastify()

mongoConnect()

// TODO Create an extensive & secure CORS policy.
app.register(require('fastify-cors'), {
	origin: ['localhost', '*.tweepsbook.com', 'tweepsbook.com'],
	credentials: true,
	allowedHeaders: [],
	exposedHeaders: [],
})

app.register(require('middie')).then(() => {
	app.use(require('connect-slashes')(false))
})

app.register(require('./routes/auth'), {
	prefix: '/auth',
})
app.register(require('./routes/crud'), {
	prefix: '/crud',
})

app.listen(process.env.PORT, () => {
	console.log(`Listening on ${process.env.PORT}`)
})
