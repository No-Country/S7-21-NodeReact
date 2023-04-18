const { tryCatchWrapper, endPointResponse } = require("../helpers");
const apptServices = require("../services/appointments.services");
const sBarberServices = require("../services/servicesBarber.services");

const postAppointment = tryCatchWrapper(async (req, res, next) => {
  const { barberId } = req.params;
  const { date, hour, servicesId, message } = req.body;
  const serviceBarber = await sBarberServices.findSingleServiceBarber(
    servicesId
  );
  const newAppointment = await apptServices.createAppointment(
    barberId,
    date,
    hour,
    servicesId,
    message,
    req.user.id
  );

  endPointResponse({
    res,
    code: 201,
    message: "Turno creado",
    body: { newAppointment, serviceBarber },
  });
});

const getAppointmentsById = tryCatchWrapper(async (req, res, next) => {
  const { barberId } = req.params;
  const appointments = await apptServices.findAppointments(barberId);

  endPointResponse({ res, message: "turnos asignados", body: appointments });
});

const patchAppointment = tryCatchWrapper(async (req, res, next) => {
  const { appointmentId } = req.params;
  const { newDate, newHour, status } = req.body;
  const response = await apptServices.updateAppointment(
    appointmentId,
    newDate,
    newHour
  );
  endPointResponse({ res, message: response });
});

// const deleteAppointment = tryCatchWrapper(async (req, res, next) => {
//   const { appointmentId } = req.params;
//   const response = await apptServices.deleteAppointmentById(
//     appointmentId,
//     req.user
//   );

//   endPointResponse({ res, message: response });
// });

const getMyAppointments = tryCatchWrapper(async (req, res, next) => {
  const clientId = req.user.id;
  const response = await apptServices.findMyAppointments(clientId);

  endPointResponse({ res, message: "turnos asignados", body: response });
});

const cancelAppointment = tryCatchWrapper(async (req, res, next) => {
  const { appointmentId } = req.params;
  const cancelAppointment = await apptServices.findAndCancelAppointment(
    appointmentId
  );

  endPointResponse({
    res,
    message: "Turno cancelado de manera exitosa",
    body: cancelAppointment,
  });
});

module.exports = {
  postAppointment,
  getAppointmentsById,
  getMyAppointments,
  patchAppointment,
  // deleteAppointment,
  cancelAppointment,
};
