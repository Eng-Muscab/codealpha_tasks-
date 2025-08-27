import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routers/user-route.js";
import eventRouter from "./routers/event-route.js";
import registerRouter from "./routers/register-route.js";

dotenv.config(); // correct spelling

const app = express();
connectDB();

app.use(cors({ origin: "http://localhost:5173" })); // React Vite default port
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);
app.use("/api/registrations", registerRouter);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
