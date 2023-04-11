const router = require("express").Router();
const apptCtrls = require("../controllers/appointments.controllers");
const { authenticateUser } = require("../middlewares/auth.middleware");

router
  .route("/:barberId")
  .post(authenticateUser, apptCtrls.postAppointment)
  .get(authenticateUser, apptCtrls.getAppointments);

module.exports = router;
