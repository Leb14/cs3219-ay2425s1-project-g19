const WebSocket = require('ws');

// Store WebSocket connections for each user
const wsClients = new Map();

// Set up WebSocket server
const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');

    // Store connection when a user sends their ID
    ws.on('message', (message) => {
      const { userId } = JSON.parse(message);
      wsClients.set(userId, ws);
      console.log(`WebSocket connection stored for user ${userId}`);
    });

    // Clean up when the connection is closed
    ws.on('close', () => {
      wsClients.forEach((value, key) => {
        if (value === ws) {
          wsClients.delete(key);
          console.log(`WebSocket connection closed for user ${key}`);
        }
      });
    });
  });
};

// Helper function to send a message to a specific user by userId
const sendWsMessage = (userId, message) => {
  const ws = wsClients.get(userId);
  if (ws) {
    ws.send(JSON.stringify(message));
    console.log(`Sent WebSocket message to user ${userId}:`, message);
  } else {
    console.log(`No WebSocket connection found for user ${userId}`);
  }
};

module.exports = { setupWebSocket, sendWsMessage };
