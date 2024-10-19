const express = require("express");
const {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUserByEmail,
  updateUser,
  updateUserPrivilege,
} = require("../controller/user-controller.js");
const { verifyAccessToken, verifyIsAdmin, verifyIsOwnerOrAdmin, verifyIsOwnerOrAdminByEmail } = require("../middleware/basic-access-control.js");

const router = express.Router();

router.get("/", verifyAccessToken, verifyIsAdmin, getAllUsers);
router.patch("/id/:id/privilege", verifyAccessToken, verifyIsAdmin, updateUserPrivilege);
router.post("/", createUser);
router.get("/id/:id", verifyAccessToken, verifyIsOwnerOrAdmin, getUser);
router.get("/email/:email", verifyAccessToken, verifyIsOwnerOrAdminByEmail, getUserByEmail);
router.patch("/id/:id", verifyAccessToken, verifyIsOwnerOrAdmin, updateUser);
router.delete("/id/:id", verifyAccessToken, verifyIsOwnerOrAdmin, deleteUser);

module.exports = router;
