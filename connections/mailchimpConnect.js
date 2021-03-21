var Mailchimp = require('mailchimp-api-v3'),
    dotenv = require("dotenv");

dotenv.config();

var mailchimp = new Mailchimp(process.env.MAILCHIMP_API);

module.exports = mailchimp;