import { useState, useEffect } from "react";
import api from "../api/api.js";

export default function Tables() {
  const [tables, setTables] = useState([]);
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const res = await api.get("/tables");
      setTables(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const saveTable = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/tables/${editId}`, { name, capacity });
        setEditId(null);
      } else {
        await api.post("/tables", { name, capacity });
      }
      setName("");
      setCapacity("");
      fetchTables();
    } catch (e) {
      console.error(e);
    }
  };

  const editTable = (t) => {
    setEditId(t._id);
    setName(t.name);
    setCapacity(t.capacity);
  };

  const deleteTable = async (id) => {
    if (!confirm("Delete this table?")) return;
    try {
      await api.delete(`/tables/${id}`);
      fetchTables();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tables</h1>
      <form onSubmit={saveTable} className="mb-6 flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Table Name"
          className="border p-2 rounded flex-1"
          required
        />
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          placeholder="Capacity"
          className="border p-2 rounded w-32"
          required
        />
        <button className="bg-blue-600 text-white px-4 rounded">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <ul>
        {tables.map((t) => (
          <li
            key={t._id}
            className="p-2 border-b flex justify-between items-center"
          >
            <span>
              {t.name} - Capacity: {t.capacity}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => editTable(t)}
                className="bg-yellow-500 text-white px-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTable(t._id)}
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
