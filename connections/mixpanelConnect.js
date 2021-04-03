var Mixpanel = require("mixpanel"),
    dotenv = require("dotenv");

dotenv.config();

var mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN);

module.exports = mixpanel;