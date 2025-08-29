import { useState, useEffect } from "react";
import api from "../api/api.js";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await api.get("/inventory");
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const saveItem = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/inventory/${editId}`, { name, quantity });
        setEditId(null);
      } else {
        await api.post("/inventory", { name, quantity });
      }
      setName("");
      setQuantity("");
      fetchInventory();
    } catch (err) {
      console.error(err);
    }
  };

  const editItem = (item) => {
    setEditId(item._id);
    setName(item.name);
    setQuantity(item.quantity);
  };

  const deleteItem = async (id) => {
    if (!confirm("Delete this item?")) return;
    try {
      await api.delete(`/inventory/${id}`);
      fetchInventory();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>

      <form onSubmit={saveItem} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded flex-1"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 rounded w-32"
          required
        />
        <button className="bg-red-600 text-white px-4 rounded">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <ul>
        {items.map((i) => (
          <li
            key={i._id}
            className="p-2 border-b flex justify-between items-center"
          >
            <span>
              {i.name} - Qty: {i.quantity}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => editItem(i)}
                className="bg-yellow-500 text-white px-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteItem(i._id)}
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
