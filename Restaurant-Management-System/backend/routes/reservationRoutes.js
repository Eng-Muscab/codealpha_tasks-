import express from "express";
import { reserveTable } from "../controllers/reservationController.js";
const router = express.Router();

router.post("/", reserveTable);

export default router;
