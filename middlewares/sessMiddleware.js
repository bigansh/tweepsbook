var session = require('express-session'),
	MongoStore = require('connect-mongo'),
	dotenv = require('dotenv')

dotenv.config()

var sessObj = {}

sessObj.session = session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: true,
	autoRemove: 'native',
	store: MongoStore.create({ mongoUrl: process.env.DATABASEURL }),
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 14, //14 Days
	},
})

module.exports = sessObj
