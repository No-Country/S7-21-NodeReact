const transporter = require("../helpers/notifactions/gmail/config.js");
const gmailOptions = require("../helpers/notifactions/gmail/emailSender.js");
const emailNewUser = require("../helpers/notifactions/templates/newUserEmail.js");

/**
 * Middleware para el envío de mails a usuarios nuevos.
 * @param {String} email email de usario nuevo
 * @param {String} userName nombre del usuario nuevo
 * @param {String} lastName apellido del usuario nuevo
 *
 * @example
 * await sendNewUser(email, firstName, lastName)
 */

async function sendNewUser(
  email,
  userName,
  lastName,
  verificationToken,
  origin
) {
  try {
    const htmlTemplate = emailNewUser(
      userName,
      lastName,
      email,
      verificationToken,
      origin
    );
    const emailSubject = "Cuenta Nueva";
    await transporter.sendMail(gmailOptions(email, emailSubject, htmlTemplate));
  } catch (err) {
    console.log("Error al leer el archivo HTML: ", err);
  }
}

module.exports = sendNewUser;
