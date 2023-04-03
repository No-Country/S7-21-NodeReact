const express = require('express');
const { checkSchema } = require('express-validator');
const { authenticateUser } = require('../middlewares/auth.middleware');
const { getAllUsers, showMe } = require('../controllers/users.controllers');

const router = express.Router();

router.get('/showMe', authenticateUser, showMe);
router.get("/:roleUser", authenticateUser, getAllUsers)

module.exports = router;

