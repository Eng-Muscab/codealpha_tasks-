import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  table: { type: mongoose.Schema.Types.ObjectId, ref: "Table", required: true },
  time: { type: Date, required: true },
  people: { type: Number, required: true },
});

export default mongoose.model("Reservation", reservationSchema);
