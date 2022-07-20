require('dotenv').config()

const mongoose = require('mongoose')

/**
 * A function that connects to the DB.
 */
const mongoConnect = () => {
    mongoose
        .connect(process.env.DATABASE_URL)
        .then(() => console.log('Connected to DB!'))
        .catch((error) => console.log(error))
}

module.exports = mongoConnect
