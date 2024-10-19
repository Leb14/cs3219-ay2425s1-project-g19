const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const matchingRoutes = require('./routes/matching');
const { setupWebSocket } = require('./ws');
const { setupConsumer } = require('./consumer');

const app = express();
const PORT = process.env.PORT || 8002;

app.use(cors());
app.use(bodyParser.json());

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/matching", matchingRoutes);

setupWebSocket(server);
setupConsumer();
