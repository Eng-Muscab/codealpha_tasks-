import { useState, useEffect } from "react";
import api from "../api/api.js";

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [customer, setCustomer] = useState("");
  const [tableId, setTableId] = useState("");
  const [time, setTime] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTables();
    fetchReservations();
  }, []);

  const fetchTables = async () => {
    try {
      const res = await api.get("/tables");
      setTables(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await api.get("/reservations");
      setReservations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const saveReservation = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/reservations/${editId}`, { customer, tableId, time });
        setEditId(null);
      } else {
        await api.post("/reservations", { customer, tableId, time });
      }
      setCustomer("");
      setTableId("");
      setTime("");
      fetchReservations();
    } catch (err) {
      console.error(err);
    }
  };

  const editReservation = (r) => {
    setEditId(r._id);
    setCustomer(r.customer);
    setTableId(r.tableId);
    setTime(r.time.slice(0, 16)); // for datetime-local
  };

  const deleteReservation = async (id) => {
    if (!confirm("Delete this reservation?")) return;
    try {
      await api.delete(`/reservations/${id}`);
      fetchReservations();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reservations</h1>

      <form onSubmit={saveReservation} className="mb-6 flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Customer Name"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <select
          value={tableId}
          onChange={(e) => setTableId(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Table</option>
          {tables.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <button className="bg-purple-600 text-white px-4 rounded">
          {editId ? "Update" : "Reserve"}
        </button>
      </form>

      <ul>
        {reservations.map((r) => (
          <li
            key={r._id}
            className="p-2 border-b flex justify-between items-center"
          >
            <span>
              {r.customer} - Table {r.tableName} @{" "}
              {new Date(r.time).toLocaleString()}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => editReservation(r)}
                className="bg-yellow-500 text-white px-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteReservation(r._id)}
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
