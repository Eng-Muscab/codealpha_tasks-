import { useState, useEffect } from "react";
import api from "../api/api.js";

export default function Orders() {
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMenu();
    fetchOrders();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await api.get("/menu");
      setMenu(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const saveOrder = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/orders/${editId}`, { itemId: selectedItem, quantity });
        setEditId(null);
      } else {
        await api.post("/orders", { itemId: selectedItem, quantity });
      }
      setSelectedItem("");
      setQuantity(1);
      fetchOrders();
    } catch (e) {
      console.error(e);
    }
  };

  const editOrder = (order) => {
    setEditId(order._id);
    setSelectedItem(order.itemId);
    setQuantity(order.quantity);
  };

  const deleteOrder = async (id) => {
    if (!confirm("Delete this order?")) return;
    try {
      await api.delete(`/orders/${id}`);
      fetchOrders();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <form onSubmit={saveOrder} className="mb-6 flex gap-2">
        <select
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
          className="border p-2 rounded flex-1"
          required
        >
          <option value="">Select Item</option>
          {menu.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name} - ${m.price}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 rounded w-24"
        />
        <button className="bg-green-600 text-white px-4 rounded">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <ul>
        {orders.map((o) => (
          <li
            key={o._id}
            className="p-2 border-b flex justify-between items-center"
          >
            <span>
              {o.itemName} x{o.quantity}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => editOrder(o)}
                className="bg-yellow-500 text-white px-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteOrder(o._id)}
                className="bg-red-600 text-white px-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
