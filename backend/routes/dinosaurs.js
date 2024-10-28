const express = require('express');
const { getDinosaurs } = require('../controllers/dinosaurController');
const router = express.Router();

router.get('/', getDinosaurs);

module.exports = router;
