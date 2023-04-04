const express = require("express");
const { checkSchema } = require("express-validator");
const { authenticateUser } = require("../middlewares/auth.middleware");
const {
  getAllUsers,
  showMe,
  getUserById,
  updateUserById,
  deleteUser,
} = require("../controllers/users.controllers");

const router = express.Router();

router.get("/showMe", authenticateUser, showMe);
router.get("/:id", authenticateUser, getUserById);
router.patch("/:id", authenticateUser, updateUserById);

// Ruta de actualizar usuario por id
router.delete("/:id", authenticateUser, deleteUser);

router.get("/:roleUser", authenticateUser, getAllUsers);

module.exports = router;
