import Order from "../models/Order.js";
import Table from "../models/Table.js";
import Inventory from "../models/Inventory.js";
import MenuItem from "../models/MenuItem.js";

// Place an order
export const placeOrder = async (req, res) => {
  try {
    const { tableId, items } = req.body;

    // Check if table is available
    const table = await Table.findById(tableId);
    if (!table || !table.available) {
      return res.status(400).json({ error: "Table is not available" });
    }

    // Calculate total & update inventory
    let total = 0;
    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem)
        return res.status(404).json({ error: "Menu item not found" });

      total += menuItem.price * item.quantity;

      // Reduce stock in inventory (simulate: item name = inventory name)
      await Inventory.findOneAndUpdate(
        { name: menuItem.name },
        { $inc: { quantity: -item.quantity } }
      );
    }

    const order = new Order({
      table: tableId,
      items,
      total,
    });

    await order.save();
    table.available = false; // Table is occupied
    await table.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Complete order
export const completeOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = "completed";
    await order.save();

    // Free the table
    const table = await Table.findById(order.table);
    if (table) {
      table.available = true;
      await table.save();
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
