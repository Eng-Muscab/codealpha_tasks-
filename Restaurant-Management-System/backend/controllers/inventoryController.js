import Inventory from "../models/Inventory.js";

// Get inventory
export const getInventory = async (req, res) => {
  try {
    const stock = await Inventory.find();
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add item to inventory
export const addInventoryItem = async (req, res) => {
  try {
    const item = new Inventory(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Stock alert
export const getLowStock = async (req, res) => {
  try {
    const items = await Inventory.find({ quantity: { $lt: 5 } });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
