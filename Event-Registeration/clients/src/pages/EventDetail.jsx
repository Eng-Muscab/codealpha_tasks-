import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../Api/api.js";
import { useUser } from "../context/UserContext.jsx";
import { useToast } from "../components/ToastProvider.jsx";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const { user } = useUser();
  const { showToast } = useToast();

  useEffect(() => {
    API.get(`/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleRegister = async () => {
    if (!user) return showToast("Please login first to register");
    try {
      await API.post(`/registrations/${id}`, { userId: user._id });
      showToast("Registered successfully!");
    } catch (err) {
      showToast(err.response?.data?.message || "Error registering");
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-700 mb-4">{event.description}</p>
      <p className="text-gray-500 mb-2">
        Date: {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-gray-500 mb-4">Location: {event.location}</p>
      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Register for this Event
      </button>
      <button
        className="bg-green-400 py-2 px-4 text-white rounded-sm ml-3 hover:bg-green-500 transition"
        onClick={() => window.history.back()}
      >
        Back
      </button>
    </div>
  );
}
