import express from "express";
import {
  getTours,
  getTourById,
  deleteTour,
  updateTour,
  createTour
} from "../controllers/tourController.js";
import { admin, protect } from "../Middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getTours).post(protect,admin,createTour)
router.route("/:id").get(getTourById).delete(protect, admin, deleteTour).put(protect,admin,updateTour)

export default router;
