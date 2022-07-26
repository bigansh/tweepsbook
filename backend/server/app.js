require('dotenv').config()

const { fastify } = require('fastify')

const mongoConnect = require('./utils/auth/mongoConnect')

const app = fastify()

mongoConnect()

app.register(require('@fastify/helmet'), {
	global: true,
})
app.register(require('@fastify/cors'), {
	credentials: true,
	strictPreflight: false,
	methods: ['GET', 'POST', 'PATCH', 'DELETE'],
	origin: [
		process.env.CLIENT,
		'http://localhost:8080',
		'http://localhost:5000',
	],
})

app.register(require('./utils/controllers/jwtPlugin'))
app.register(require('./utils/controllers/authPlugin'))

app.register(require('./routes/index'), {
	prefix: '/',
})
app.register(require('./routes/auth'), {
	prefix: '/auth',
})
app.register(require('./routes/crud'), {
	prefix: '/crud',
})
app.register(require('./routes/account'), {
	prefix: '/account',
})

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
	console.log(`Listening on ${process.env.PORT || 3000}!`)
})
