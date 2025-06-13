const mongoose = require('mongoose');

const TelemetrySchema = new mongoose.Schema({
    vehicleId: String,
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Telemetry', TelemetrySchema);
