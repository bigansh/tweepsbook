const sendgridClient = require('@sendgrid/client')

sendgridClient.setApiKey(process.env.CLIENT_SENDGRID)

module.exports = sendgridClient
