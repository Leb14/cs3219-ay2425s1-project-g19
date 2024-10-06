const express = require("express");
const {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  updateUserPrivilege,
} = require("../controller/user-controller.js");
const { verifyAccessToken, verifyIsAdmin, verifyIsOwnerOrAdmin } = require("../middleware/basic-access-control.js");

const router = express.Router();

router.get("/", verifyAccessToken, verifyIsAdmin, getAllUsers);
router.patch("/:id/privilege", verifyAccessToken, verifyIsAdmin, updateUserPrivilege);
router.post("/", createUser);
router.get("/:id", verifyAccessToken, verifyIsOwnerOrAdmin, getUser);
router.patch("/:id", verifyAccessToken, verifyIsOwnerOrAdmin, updateUser);
router.delete("/:id", verifyAccessToken, verifyIsOwnerOrAdmin, deleteUser);

module.exports = router;
