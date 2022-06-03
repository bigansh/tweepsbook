require('dotenv').config()

const Mixpanel = require('mixpanel')

const mixpanel = Mixpanel.init(process.env.TOKEN_MIXPANEL)

module.exports = mixpanel
