// import Registration from "../models/Registeration.js";
// import Events from "../models/Events.js";
// import Users from "../models/Users.js";

// // POST /events/:id/register
// export const createRegistration = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const eventId = req.params.id;

//     const user = await Users.findById(userId);
//     const event = await Events.findById(eventId);

//     if (!user) return res.status(404).json({ message: "User not found" });
//     if (!event) return res.status(404).json({ message: "Event not found" });

//     // check if already registered
//     const existing = await Registration.findOne({
//       user: userId,
//       event: eventId,
//     });
//     if (existing) {
//       return res
//         .status(400)
//         .json({ message: "User already registered for this event" });
//     }

//     const registration = await Registration.create({
//       user: userId,
//       event: eventId,
//     });

//     res.status(201).json(registration);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GET /registrations
// export const getAllRegistrations = async (req, res) => {
//   try {
//     const registrations = await Registration.find()
//       .populate("user")
//       .populate("event");
//     res.status(200).json(registrations);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GET /registrations/:id
// export const getRegistrationById = async (req, res) => {
//   try {
//     const registration = await Registration.findById(req.params.id)
//       .populate("user")
//       .populate("event");

//     if (!registration)
//       return res.status(404).json({ message: "Registration not found" });

//     res.status(200).json(registration);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GET /users/:id/registrations
// export const getUserRegistrations = async (req, res) => {
//   try {
//     const registrations = await Registration.find({
//       user: req.params.id,
//     }).populate("event");
//     res.status(200).json(registrations);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // PUT /registrations/:id
// export const updateRegistration = async (req, res) => {
//   try {
//     const registration = await Registration.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!registration) {
//       return res.status(404).json({ message: "Registration not found" });
//     }

//     res.status(200).json(registration);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE /registrations/:id
// export const deleteRegistration = async (req, res) => {
//   try {
//     const registration = await Registration.findByIdAndDelete(req.params.id);

//     if (!registration) {
//       return res.status(404).json({ message: "Registration not found" });
//     }

//     res.status(200).json({ message: "Registration deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

import Registration from "../models/Registeration.js";
import User from "../models/Users.js";
import Event from "../models/Events.js";

// Register a user to an event
export const createRegistration = async (req, res) => {
  try {
    const { userId } = req.body; // current user ID from frontend
    const eventId = req.params.id;

    const user = await User.findById(userId);
    const event = await Event.findById(eventId);

    if (!user || !event)
      return res.status(404).json({ message: "User or Event not found" });

    const existing = await Registration.findOne({
      user: userId,
      event: eventId,
    });
    if (existing)
      return res.status(400).json({ message: "Already registered" });

    const registration = await Registration.create({
      user: userId,
      event: eventId,
    });
    res.status(201).json(registration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get registrations for a user
export const getUserRegistrations = async (req, res) => {
  try {
    const userId = req.query.userId;
    const registrations = await Registration.find({ user: userId }).populate(
      "event"
    );
    res.status(200).json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a registration
export const deleteRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    if (!registration)
      return res.status(404).json({ message: "Registration not found" });
    res.status(200).json(registration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("user")
      .populate("event");
    res.status(200).json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
