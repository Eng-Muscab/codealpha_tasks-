import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  capacity: { type: Number, required: true },
  available: { type: Boolean, default: true },
});

export default mongoose.model("Table", tableSchema);
