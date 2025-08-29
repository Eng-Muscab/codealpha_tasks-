import express from "express";
import { placeOrder, completeOrder } from "../controllers/orderController.js";
const router = express.Router();

router.post("/", placeOrder);
router.put("/:id/complete", completeOrder);

export default router;
