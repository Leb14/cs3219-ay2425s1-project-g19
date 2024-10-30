const express = require('express');
const cors = require('cors');
const { setupWebSocket } = require('./ws');
const roomRoutes = require('./routes/room');

const app = express();
const PORT = process.env.PORT || 8003;

// Middleware
app.use(cors());
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use('/rooms', roomRoutes);

setupWebSocket(server);
