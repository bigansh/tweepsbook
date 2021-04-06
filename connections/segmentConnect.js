var Analytics = require('analytics-node'),
    dotenv = require("dotenv");

dotenv.config();

var analytics = new Analytics(process.env.SEGMENT);

module.exports = analytics;