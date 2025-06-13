require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectMongo = require('./services/mongo.service');
const telemetryRoutes = require('./routes/telemetry.routes');

const app = express();
app.use(cors());
app.use(express.json());
connectMongo();

app.use('/telemetry', telemetryRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Telemetry ingestion service running on port ${PORT}`);
});
