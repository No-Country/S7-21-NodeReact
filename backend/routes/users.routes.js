const express = require('express');
const { checkSchema } = require('express-validator');
const { authenticateUser } = require('../middlewares/auth.middleware');
const { showMe } = require('../controllers/userController');

const router = express.Router();

router.get('/showMe', authenticateUser, showMe);

module.exports = router;

