import express from "express";
import {
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
  getAllTimeSlots,
} from "../controllers/tsCtrl.js";
import authMiddleware from "../middleware/authMiddleware .js";

const tsRoute = express.Router();

tsRoute.post("/create", authMiddleware, createTimeSlot);
tsRoute.put("/update/:id", authMiddleware, updateTimeSlot);
tsRoute.delete("/delete/:id", authMiddleware, deleteTimeSlot);
tsRoute.get("/all", getAllTimeSlots);

export default tsRoute;
