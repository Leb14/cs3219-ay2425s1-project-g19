const { v4: uuidv4 } = require('uuid');
const { RoomManager } = require('../roomManager');

const roomManager = new RoomManager();

// @desc    Create a new room
// @route   POST /create
// @access  Public
const createRoom = async (req, res) => {
  const { users, difficulty, category } = req.body;
  const roomId = uuidv4();

  const room = roomManager.createRoom(roomId, users, difficulty, category);

  res.json({
    success: true,
    roomId,
    room: room.toJSON()
  });
};

// @desc    Get room information
// @route   GET /:roomId
// @access  Public
const getRoomInfo = async (req, res) => {
  const { roomId } = req.params;
  const room = roomManager.getRoom(roomId);

  if (!room) {
    return res.status(404).json({
      success: false,
      message: 'Room not found'
    });
  }

  res.json({
    success: true,
    room: room.toJSON()
  });
};

// @desc    Join a room
// @route   POST /:roomId/join
// @access  Public
const joinRoom = async (req, res) => {
  const { roomId } = req.params;
  const { userId } = req.body;
  const room = roomManager.getRoom(roomId);

  if (!room) {
    return res.status(404).json({
      success: false,
      message: 'Room not found'
    });
  }

  if (!room.isUserAuthorized(userId)) {
    return res.status(403).json({
      success: false,
      message: 'User not authorised to join this room'
    });
  }

  res.json({
    success: true,
    room: room.toJSON()
  });
};

// @desc    Leave a room
// @route   POST /:roomId/leave
// @access  Public
const leaveRoom = async (req, res) => {
  const { roomId } = req.params;
  const { userId } = req.body;
  const room = roomManager.getRoom(roomId);

  if (!room) {
    return res.status(404).json({
      success: false,
      message: 'Room not found'
    });
  }

  if (!room.isUserAuthorized(userId)) {
    return res.status(403).json({
      success: false,
      message: 'User not found in room'
    });
  }

  room.removeUser(userId);

  if (room.connectedUsers.size === 0) {
    roomManager.deleteRoom(roomId);
  }

  res.json({
    success: true,
    message: 'Successfully left room'
  });
};

module.exports = {
  createRoom,
  getRoomInfo,
  joinRoom,
  leaveRoom
};