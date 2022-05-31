require('dotenv').config()

const Mixpanel = require('mixpanel')

const mixpanel = Mixpanel.init(process.env.TOKEN_MIXPANEL)

mixpanel.set_config({ debug: true })

module.exports = mixpanel
