const Telemetry = require('../models/telemetry.model');
const redisClient = require('../services/redis.service');

exports.postTelemetry = async (req, res) => {
    const { vehicleId, latitude, longitude } = req.body;

    if (!vehicleId || !latitude || !longitude) {
        return res.status(400).json({ message: 'Missing telemetry fields' });
    }

    const telemetry = new Telemetry({ vehicleId, latitude, longitude });
    await telemetry.save();

    await redisClient.set(vehicleId, JSON.stringify({ latitude, longitude }), { EX: 60 });

    console.log(`Received telemetry from ${vehicleId}`);
    res.status(201).json({ message: 'Telemetry saved' });
};

exports.getLatestTelemetry = async (req, res) => {
    const { vehicleId } = req.params;

    const cached = await redisClient.get(vehicleId);
    if (cached) return res.json(JSON.parse(cached));

    const latest = await Telemetry.findOne({ vehicleId }).sort({ timestamp: -1 });
    if (!latest) return res.status(404).json({ message: 'Not found' });

    res.json({ latitude: latest.latitude, longitude: latest.longitude });
};
