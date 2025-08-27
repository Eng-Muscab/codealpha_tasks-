import Events from "../models/Events.js";

export const getAllEvents = async (req, res) => {
  try {
    const events = await Events.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Events.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const event = await Events.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Events.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Events.findByIdAndDelete(req.params.id);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
