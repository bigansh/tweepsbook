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
app.register(require('fastify-jwt'), {
	secret: process.env.SECRET_JWT,
})

app.register(require('./utils/controllers/jwtPlugin'))

// TODO Add onError & onRequest hooks logic.
app.addHook('onRequest', require('./utils/functions/onRequestHooks'))
app.addHook('onError', require('./utils/functions/onErrorHook'))

app.register(require('./routes/auth'), {
	prefix: '/auth',
})
app.register(require('./routes/crud'), {
	prefix: '/crud',
})
app.register(require('./routes/account'), {
	prefix: '/account',
})

app.listen(process.env.PORT || 3000, () => {
	console.log(`Listening on ${process.env.PORT || 3000}`)
})
