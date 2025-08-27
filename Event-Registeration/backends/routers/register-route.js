import express from "express";
import {
  getAllRegistrations,
  createRegistration,
  deleteRegistration,
} from "../controllers/registeration-controller.js";

const router = express.Router();

router.get("/", getAllRegistrations);
router.post("/:id", createRegistration); // register user for event
router.delete("/:id", deleteRegistration);

export default router;
