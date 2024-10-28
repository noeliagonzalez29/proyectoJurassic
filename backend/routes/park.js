const express = require('express');
const { getParkStatus, updatePark } = require('../controllers/parkController');
const router = express.Router();

router.get('/status', getParkStatus);
router.put('/update', updatePark);

module.exports = router;
