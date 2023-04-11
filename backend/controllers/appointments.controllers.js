const { tryCatchWrapper, endPointResponse } = require("../helpers");
const apptServices = require("../services/appointments.services");

const postAppointment = tryCatchWrapper(async (req, res, next) => {
  const { barberId } = req.params;
  const { date, hour } = req.body;

  const response = await apptServices.createAppointment(
    barberId,
    date,
    hour,
    req.user.id
  );

  endPointResponse({ res, code: 201, message: "Turno creado", body: response });
});

const getAppointments = tryCatchWrapper(async (req, res, next) => {
  const { barberId } = req.params;
  const response = await apptServices.findAppointments(barberId);

  endPointResponse({ res, message: "turnos asignados", body: response });
});

module.exports = { postAppointment, getAppointments };
