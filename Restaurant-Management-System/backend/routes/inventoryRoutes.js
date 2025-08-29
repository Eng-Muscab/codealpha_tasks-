import express from "express";
import {
  getInventory,
  addInventoryItem,
  getLowStock,
} from "../controllers/inventoryController.js";
const router = express.Router();

router.get("/", getInventory);
router.post("/", addInventoryItem);
router.get("/low-stock", getLowStock);

export default router;
