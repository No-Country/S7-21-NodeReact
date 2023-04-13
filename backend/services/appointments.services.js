const { CustomError, checkPermissions } = require("../helpers");
const { User, appointments } = require("../database/models");
const { Op } = require("sequelize");

const findBarber = async (barberId) => {
  try {
    const barber = await User.findOne({
      where: {
        [Op.and]: [{ id: barberId }, { role: "barber" }],
      },
    });
    if (!barber) {
      throw new CustomError("No se encontro ningun barbero con ese Id", 404);
    }
    return barber;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findAppointment = async (appointmentId) => {
  try {
    const appointment = await appointments.findOne({
      where: { id: appointmentId },
    });
    if (!appointment) {
      throw new CustomError("No se encontro ningun turno con este Id", 404);
    }
    return appointment;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const createAppointment = async (
  barberId,
  date,
  hour,
  service,
  message,
  clientId
) => {
  try {
    const barber = await findBarber(barberId);

    const [response, created] = await appointments.findOrCreate({
      where: {
        [Op.and]: [{ appointmentDate: date }, { appointmentHour: hour }],
      },
      defaults: {
        appointmentDate: date,
        appointmentHour: hour,
        service,
        message,
        clientId,
        barberId: barber.id,
        status: "notAllow",
      },
    });
    if (!created) {
      throw new CustomError("Este turno ya se encuentra asignado", 400);
    }

    return response;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findAppointments = async (barberId) => {
  try {
    const barber = await findBarber(barberId);
    const appointments = await barber.getAppointments({
      attributes: [
        "id",
        "clientId",
        "status",
        "appointmentDate",
        "appointmentHour",
      ],
    });
    return appointments;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const updateAppointment = async (appointmentId, newDate, newHour) => {
  try {
    const appointment = await findAppointment(appointmentId);
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const deleteAppointmentById = async (appointmentId, reqUser) => {
  try {
    const appointment = await findAppointment(appointmentId);
    checkPermissions(reqUser, appointment.clientId);
    await appointment.destroy();

    return `Turno ${appointmentId} eliminado`;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};
// Función para enviar alertas de correo electrónico
const alertAppoimet = async function enviarAlertas() {
  try {
    // Obtener todas las citas que se llevarán a cabo en una hora
    const citas = await appointment.findAll({
      where: {
        appointmentDate: {
          [Op.between]: [new Date(), new Date(Date.now() + 60 * 60 * 1000)]
        },
        satus: 'allow'
      }
    });

    // Para cada cita, obtener la información del cliente y del barbero correspondiente y enviar una alerta por correo electrónico al cliente
    for (let cita of citas) {
      const cliente = await User.findOne({
        where: {
          id: cita.clientId,
          role: 'client'
        }
      });
      const barbero = await User.findOne({
        where: {
          id: cita.barberId,
          role: 'barber'
        }
      });

      // Configurar el correo electrónico
      const correoElectronico = {
        from: 'user@example.com',
        to: cliente.email,
        subject: 'Recordatorio de cita',
        text: confirmationTemplate
      };

      // Enviar el correo electrónico
      const info = await transporter.sendMail(correoElectronico);
      console.log(`Correo electrónico enviado a ${cliente.email}: ${info.messageId}`);
    }
  } catch (error) {
    console.error(error);
  }
}

// Programar el envío de alertas de correo electrónico una vez cada hora
setInterval(enviarAlertas, 60 * 60 * 1000);

module.exports = {
  createAppointment,
  findAppointments,
  updateAppointment,
  deleteAppointmentById,
};
