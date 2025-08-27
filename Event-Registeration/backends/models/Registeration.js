import mongoose from "mongoose";
import User from "./Users.js";
import Event from "./Events.js";

const RegistrationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    status: { type: String, default: "registered" },
  },
  { timestamps: true }
);

export default mongoose.model("Registration", RegistrationSchema);
