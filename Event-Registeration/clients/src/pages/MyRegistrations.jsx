import { useEffect, useState } from "react";
import API from "../Api/api.js";
import { useUser } from "../context/UserContext.jsx";
import { useToast } from "../components/ToastProvider.jsx";
import { Link } from "react-router-dom";

export default function MyRegistrations() {
  const { user } = useUser();
  const { showToast } = useToast();
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    if (!user) return;
    API.get(`/registrations/user/${user._id}`)
      .then((res) => setRegistrations(res.data))
      .catch((err) =>
        showToast(err.response?.data?.message || "Error loading registrations")
      );
  }, [user]);

  const handleCancel = async (id) => {
    try {
      await API.delete(`/registrations/${id}`);
      setRegistrations(registrations.filter((r) => r._id !== id));
      showToast("Registration canceled");
    } catch (err) {
      showToast(err.response?.data?.message || "Error canceling registration");
    }
  };

  if (!user)
    return (
      <p className="text-center mt-20">
        Please login to see your registrations
      </p>
    );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Registrations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {registrations.map((r) => (
          <div key={r._id} className="border rounded-lg p-4 shadow bg-white">
            <h2 className="text-xl font-bold mb-2">{r.event.title}</h2>
            <p className="text-gray-600 mb-2">{r.event.description}</p>
            <p className="text-gray-500 mb-2">
              Date: {new Date(r.event.date).toLocaleDateString()}
            </p>
            <p className="text-gray-500 mb-4">Location: {r.event.location}</p>
            <div className="flex gap-2">
              <Link
                to={`/events/${r.event._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                View
              </Link>
              <button
                onClick={() => handleCancel(r._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
