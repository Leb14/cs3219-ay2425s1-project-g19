const express = require("express");
const { handleLogin, handleVerifyToken } = require("../controller/auth-controller.js");
const { verifyAccessToken } = require("../middleware/basic-access-control.js");

const router = express.Router();

router.post("/login", handleLogin);
router.get("/verify-token", verifyAccessToken, handleVerifyToken);

module.exports = router;