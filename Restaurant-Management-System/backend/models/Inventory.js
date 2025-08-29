import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true }, // e.g., "kg", "liters"
  threshold: { type: Number, default: 5 }, // minimum stock before alert
});

export default mongoose.model("Inventory", inventorySchema);
