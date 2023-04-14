const { tryCatchWrapper, endPointResponse } = require("../helpers");
const apptServices = require("../services/appointments.services");

const postAppointment = tryCatchWrapper(async (req, res, next) => {
  const { barberId } = req.params;
  const { date, hour, service, message } = req.body;

  const response = await apptServices.createAppointment(
    barberId,
    date,
    hour,
    service,
    message,
    req.user.id
  );

  endPointResponse({ res, code: 201, message: "Turno creado", body: response });
});

const getAppointmentsById = tryCatchWrapper(async (req, res, next) => {
  const { barberId } = req.params;
  const response = await apptServices.findAppointments(barberId);

  endPointResponse({ res, message: "turnos asignados", body: response });
});

const patchAppointment = tryCatchWrapper(async (req, res, next) => {
  const { appointmentId } = req.params;
  const { newDate, newHour } = req.body;
  const response = await apptServices.updateAppointment(
    appointmentId,
    newDate,
    newHour
  );
  endPointResponse({ res, message: response })
});

const deleteAppointment = tryCatchWrapper(async (req, res, next) => {
  const { appointmentId } = req.params;
  const response = await apptServices.deleteAppointmentById(
    appointmentId,
    req.user
  );

  endPointResponse({ res, message: response });
});

const getMyAppointments = tryCatchWrapper(async (req, res, next) => {
  const clientId = req.user.id;
  const response = await apptServices.findMyAppointments(clientId);

  endPointResponse({ res, message: "turnos asignados", body: response })
})

module.exports = {
  postAppointment,
  getAppointmentsById,
  getMyAppointments,
  patchAppointment,
  deleteAppointment,
};
