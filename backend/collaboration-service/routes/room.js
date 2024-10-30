const express = require('express');
const router = express.Router();
const {
  createRoom,
  getRoomInfo,
  joinRoom,
  leaveRoom
} = require('../controllers/roomControllers');

router.post('/create', createRoom);
router.get('/:roomId', getRoomInfo);
router.post('/:roomId/join', joinRoom);
router.post('/:roomId/leave', leaveRoom);

module.exports = router;