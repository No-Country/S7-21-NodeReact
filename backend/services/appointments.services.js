const { CustomError } = require("../helpers");
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

const createAppointment = async (barberId, date, hour, clientId) => {
  try {
    const barber = await findBarber(barberId);

    const [response, created] = await appointments.findOrCreate({
      where: {
        [Op.and]: [{ appointmentDate: date }, { appointmentHour: hour }],
      },
      defaults: {
        appointmentDate: date,
        appointmentHour: hour,
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
      attributes: ["clientId", "status", "appointmentDate", "appointmentHour"],
    });
    return appointments;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

module.exports = { createAppointment, findAppointments };
