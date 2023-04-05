const transporter = require('../helpers/notifactions/gmail/config.js')
const gmailOptions = require('../helpers/notifactions/gmail/emailSender.js')
const emailNewUser = require('../helpers/notifactions/templates/newUserEmail.js')

async function sendNewUser(email, userName, lastName) {
    try {
        const htmlTemplate = emailNewUser(userName, lastName)
        const emailSubject = 'Cuenta Nueva'
        await transporter.sendMail(gmailOptions(email, emailSubject, htmlTemplate))
    } catch (err) {
        console.log('Error al leer el archivo HTML: ', err)
    }
}

module.exports = sendNewUser