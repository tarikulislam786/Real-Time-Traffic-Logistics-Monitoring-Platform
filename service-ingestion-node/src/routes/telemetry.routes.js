const express = require('express');
const router = express.Router();
const { postTelemetry, getLatestTelemetry } = require('../controllers/telemetry.controller');

router.post('/', postTelemetry);
router.get('/:vehicleId', getLatestTelemetry);

module.exports = router;
