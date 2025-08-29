import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import tableRoutes from "./routes/tableRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/inventory", inventoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
