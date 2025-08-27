import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";

export default function EventCard({ event }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white">
      <h2 className="text-xl font-bold mb-2">{event.title}</h2>
      <p className="text-gray-600 mb-2">{event.description}</p>
      <div className="flex items-center gap-4 text-gray-500 text-sm mb-2">
        <Calendar size={16} /> {new Date(event.date).toLocaleDateString()}
        <MapPin size={16} /> {event.location}
      </div>
      <Link
        to={`/events/${event._id}`}
        className="text-blue-500 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
}
