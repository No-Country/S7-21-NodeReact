const { authenticateUser, authorizeByRole } = require("../middlewares");
const sBarberCtrls = require("../controllers/servicesBarber.controllers");

const router = require("express").Router();

router.post(
  "/",
  [authenticateUser, authorizeByRole("admin")],
  sBarberCtrls.postServiceBarber
);
router.get(
  "/",
  [authenticateUser, authorizeByRole("admin")],
  sBarberCtrls.getServicesBarber
);
router.get(
  "/:serviceId",
  [authenticateUser, authorizeByRole("admin")],
  sBarberCtrls.getSingleServiceBarber
);
router.patch(
  "/:serviceId",
  [authenticateUser, authorizeByRole("admin")],
  sBarberCtrls.patchServiceBarber
);
router.delete(
  "/:serviceId",
  [authenticateUser, authorizeByRole("admin")],
  sBarberCtrls.deleteServiceBarber
);

module.exports = router;
