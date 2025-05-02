const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// POST /api/auth/signup - User signup route
router.post('/signup', signup);

// POST /api/auth/login - User login route
router.post('/login', login);

module.exports = router;
