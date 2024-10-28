const express = require('express');
const { getEnclosures } = require('../controllers/enclosureController');
const router = express.Router();

router.get('/', getEnclosures);

module.exports = router;
