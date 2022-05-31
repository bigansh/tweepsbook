require('dotenv').config()

const { fastify } = require('fastify')

const mongoConnect = require('./utils/auth/mongoConnect')

const app = fastify()

mongoConnect()

// TODO Create an extensive & secure CORS policy.
app.register(require('fastify-cors'), {
    origin: [process.env.HOST, process.env.CLIENT],
    credentials: true,
    allowedHeaders: [],
    exposedHeaders: [],
})
app.register(require('fastify/helmet'), {
    global: true,
})

app.register(require('./utils/controllers/jwtPlugin'))

// TODO Add onRequest hooks logic.
app.addHook('onRequest', require('./utils/controllers/onRequestHooks'))

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
