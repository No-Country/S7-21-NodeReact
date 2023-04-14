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

const findClient = async (clienId) => {
  try {
    const client = await User.findOne({
      where: {
        [Op.and]: [{ id: clienId}, { role: "client" }],
      },
    });
    if(!client) {
      throw new CustomError("No se encontró ningún cliente con ese Id", 404);
    }
    return client;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
}

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
        "message",
      ],
    });
    return appointments;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findMyAppointments = async (clientId) => {
  try {
    const client = await findClient(clientId);
    const appointments = await client.getAppointment({
      attributes: [
        "id",
        "barberId",
        "appointmentDate",
        "appointmentHour",
        "message",
      ],
    });
    return appointments;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors)
  }
}

const updateAppointment = async (appointmentId, newDate, newHour) => {
  try {
    const appointment = await findAppointment(appointmentId);
    const updateAppointment = await appointment.update({
      appointmentDate: newDate,
      appointmentHour: newHour,
    });
    return updateAppointment;
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

module.exports = {
  createAppointment,
  findAppointments,
  updateAppointment,
  deleteAppointmentById,
  findMyAppointments
};
