require('dotenv').config()

const mongoose = require('mongoose')

mongoose
	.connect(process.env.DB, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then(() => console.log('Connected to DB'))
	.catch((error) => console.log('ERROR:', error))
