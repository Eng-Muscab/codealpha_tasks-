import { useState } from "react";
import API from "../Api/api.js";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ToastProvider.jsx";

export default function CreateEvent() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/events", form);
      showToast("Event created successfully!");
      navigate("/");
    } catch (err) {
      showToast(err.response?.data?.message || "Error creating event");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Event</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={form.title}
          onChange={handleChange}
          className="border rounded p-3 focus:outline-blue-500"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border rounded p-3 focus:outline-blue-500"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border rounded p-3 focus:outline-blue-500"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border rounded p-3 focus:outline-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
