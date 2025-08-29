import { useState, useEffect } from "react";
import api from "../api/api.js";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchMenu = async () => {
    try {
      const res = await api.get("/menu");
      setMenuItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const saveItem = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/menu/${editId}`, { name, price });
        setEditId(null);
      } else {
        await api.post("/menu", { name, price });
      }
      setName("");
      setPrice("");
      fetchMenu();
    } catch (err) {
      console.error(err);
    }
  };

  const editItem = (item) => {
    setEditId(item._id);
    setName(item.name);
    setPrice(item.price);
  };

  const deleteItem = async (id) => {
    if (!confirm("Delete this item?")) return;
    try {
      await api.delete(`/menu/${id}`);
      fetchMenu();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <form onSubmit={saveItem} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded flex-1"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded w-32"
          required
        />
        <button className="bg-blue-600 text-white px-4 rounded">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <ul>
        {menuItems.map((item) => (
          <li
            key={item._id}
            className="p-2 border-b flex justify-between items-center"
          >
            <span>
              {item.name} - ${item.price}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => editItem(item)}
                className="bg-yellow-500 text-white px-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteItem(item._id)}
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
