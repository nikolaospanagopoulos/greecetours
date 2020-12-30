import express from "express";
import { admin, protect } from "../Middleware/authMiddleware.js";
const router = express.Router();

import {
  authUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserProfile,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";

router.route("/").post(registerUser).get(protect, admin, getAllUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
