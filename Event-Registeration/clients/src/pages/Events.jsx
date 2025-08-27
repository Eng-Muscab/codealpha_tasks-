import { useEffect, useState } from "react";
import API from "../Api/api.js";
import EventCard from "../components/EventCard.jsx";
import { Link, useNavigate } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Events</h1>
        <div className="space-x-4">
          <Link
            to="/create-event"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Create Event
          </Link>
          <Link
            className="bg-red-500 text-white rounded-sm px-2 py-2 hover:bg-red-600 transition"
            to="/logout"
            onClick={() => {
              navigate("/login");
            }}
          >
            Logout
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
