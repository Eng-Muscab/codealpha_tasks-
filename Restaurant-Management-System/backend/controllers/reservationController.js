import Reservation from "../models/Reservation.js";
import Table from "../models/Table.js";

// Reserve a table
export const reserveTable = async (req, res) => {
  try {
    const { customerName, tableId, time, people } = req.body;

    const table = await Table.findById(tableId);
    if (!table || !table.available) {
      return res.status(400).json({ error: "Table not available" });
    }
    if (people > table.capacity) {
      return res.status(400).json({ error: "Exceeds table capacity" });
    }

    const reservation = new Reservation({
      customerName,
      table: tableId,
      time,
      people,
    });

    await reservation.save();

    // Mark table as unavailable
    table.available = false;
    await table.save();

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
