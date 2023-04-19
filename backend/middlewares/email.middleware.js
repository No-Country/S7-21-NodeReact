const transporter = require("../helpers/notifactions/gmail/config.js");
const gmailOptions = require("../helpers/notifactions/gmail/emailSender.js");
const emailNewUser = require("../helpers/notifactions/templates/newUserEmail.js");
const { getReminderAppointments } = require("../services/appointments.services.js");
const endPointResponse = require("../helpers/endPointReponse.js");
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

// Función para enviar alertas de correo electrónico
async function enviarAlertas(req, res) {
  try {
    // Obtener todas las citas que se llevarán a cabo en una hora
    const citas = await getReminderAppointments();
    console.log("Hola",citas)
    
    endPointResponse({
      res,
      code: 201,
      message: "hola",
      body: { }
    });
    // if(citas) {

    // }

    // // Para cada cita, obtener la información del cliente y del barbero correspondiente y enviar una alerta por correo electrónico al cliente
    // for (let cita of citas) {
    //   const cliente = await User.findOne({
    //     where: {
    //       id: cita.clientId,
    //       role: 'client'
    //     }
    //   });
    //   const barbero = await User.findOne({
    //     where: {
    //       id: cita.barberId,
    //       role: 'barber'
    //     }
    //   });

    //   // Configurar el correo electrónico
    //   const correoElectronico = {
    //     from: 'user@example.com',
    //     to: cliente.email,
    //     subject: 'Recordatorio de cita',
    //     text: confirmationTemplate
    //   };

    //   // Enviar el correo electrónico
    //   const info = await transporter.sendMail(correoElectronico);
    //   console.log(`Correo electrónico enviado a ${cliente.email}: ${info.messageId}`);
    // }
  } catch (error) {
    console.error(error);
  }
}

// // Programar el envío de alertas de correo electrónico una vez cada hora
// setInterval(enviarAlertas, 60 * 60 * 1000);

module.exports = { sendNewUser, enviarAlertas };
