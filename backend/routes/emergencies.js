// /routes/emergencies.js
const express = require('express');
const { getEmergency } = require('../controllers/emergencyController');
const router = express.Router();

router.get('/', getEmergency);

module.exports = router;
