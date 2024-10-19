const express = require('express');
const router = express.Router();
const pushReq = require('../controllers/matchingControllers');

// Matching Service
router.post('/', pushReq);

module.exports = router;