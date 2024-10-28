const WebSocket = require('ws');

// Store clients and rooms
const wsClients = new Map();
const rooms = new Map();

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('New client connected to collaboration service');

    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        handleMessage(ws, data);
      } catch (error) {
        console.error('Error handling WebSocket message:', error);
      }
    });

    ws.on('close', () => {
      handleDisconnect(ws);
    });
  });

  return wss;
}

function handleMessage(ws, data) {
  switch (data.type) {
    case 'CONNECT':
      handleConnect(ws, data);
      break;

    case 'JOIN_ROOM':
      handleJoinRoom(ws, data);
      break;

    case 'CODE_CHANGE':
      handleCodeChange(data);
      break;

    case 'CURSOR_MOVE':
      handleCursorMove(data);
      break;

    case 'LEAVE_ROOM':
      handleLeaveRoom(ws, data);
      break;

    default:
      console.log('Unknown message type:', data.type);
  }
}

function handleConnect(ws, data) {
  wsClients.set(data.userId, ws);
  ws.userId = data.userId;
}

function handleJoinRoom(ws, data) {
  const { roomId, userId } = data;
  const room = rooms.get(roomId);

  if (room) {
    room.connectedUsers.add(userId);
    ws.roomId = roomId;

    // Send current room state
    ws.send(JSON.stringify({
      type: 'ROOM_STATE',
      code: room.code,
      users: Array.from(room.connectedUsers)
    }));

    // Notify others
    broadcastToRoom(roomId, {
      type: 'USER_JOINED',
      userId,
      users: Array.from(room.connectedUsers)
    }, userId);
  }
}

function handleCodeChange(data) {
  const { roomId, code, userId } = data;
  const room = rooms.get(roomId);

  if (room) {
    room.code = code;
    broadcastToRoom(roomId, {
      type: 'CODE_UPDATE',
      code,
      userId
    }, userId);
  }
}

function handleCursorMove(data) {
  const { roomId, position, userId } = data;
  broadcastToRoom(roomId, {
    type: 'CURSOR_UPDATE',
    position,
    userId
  }, userId);
}

function handleLeaveRoom(ws, data) {
  const { roomId, userId } = data;
  cleanupRoom(roomId, userId, ws);
}

function handleDisconnect(ws) {
  if (ws.userId) {
    wsClients.delete(ws.userId);

    if (ws.roomId) {
      cleanupRoom(ws.roomId, ws.userId, ws);
    }
  }
}

function cleanupRoom(roomId, userId, ws) {
  const room = rooms.get(roomId);
  if (room) {
    room.connectedUsers.delete(userId);

    if (ws) {
      delete ws.roomId;
    }

    broadcastToRoom(roomId, {
      type: 'USER_LEFT',
      userId,
      users: Array.from(room.connectedUsers)
    }, userId);

    if (room.connectedUsers.size === 0) {
      rooms.delete(roomId);
    }
  }
}

function broadcastToRoom(roomId, message, excludeUserId = null) {
  const room = rooms.get(roomId);
  if (room) {
    room.connectedUsers.forEach(userId => {
      if (userId !== excludeUserId) {
        const ws = wsClients.get(userId);
        if (ws) {
          ws.send(JSON.stringify(message));
        }
      }
    });
  }
}

module.exports = {
  setupWebSocket,
  rooms,
  broadcastToRoom
};