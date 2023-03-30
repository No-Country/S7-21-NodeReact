const router = require("express").Router();
const authCtrls = require("../controllers/auth.controllers");

router.post("/register", authCtrls.registerUser);

module.exports = router;
