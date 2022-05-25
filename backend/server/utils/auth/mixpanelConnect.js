require('dotenv').config()

const mixpanel = require('mixpanel')

module.export = mixpanel.init(process.env.TOKEN_MIXPANEL)
