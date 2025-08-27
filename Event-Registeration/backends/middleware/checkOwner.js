import Event from "../models/Events.js";

export const checkEventOwner = async (req, res, next) => {
  const userId = req.body.userId; // from frontend
  const eventId = req.params.id;

  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.createdBy.toString() !== userId)
    return res.status(403).json({ message: "Not authorized" });

  next();
};
