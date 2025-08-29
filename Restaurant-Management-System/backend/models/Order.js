import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  table: { type: mongoose.Schema.Types.ObjectId, ref: "Table", required: true },
  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
