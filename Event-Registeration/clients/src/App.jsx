import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useUser } from "./context/UserContext.jsx";
import Login from "./pages/Login.jsx";
import Events from "./pages/Events.jsx";
import EventDetail from "./pages/EventDetail.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import MyRegistrations from "./pages/MyRegistrations.jsx";

export default function App() {
  const { user } = useUser();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Protected */}
          <Route
            path="/"
            element={user ? <Events /> : <Navigate to="/login" />}
          />
          <Route
            path="/events/:id"
            element={user ? <EventDetail /> : <Navigate to="/login" />}
          />
          <Route
            path="/create-event"
            element={user ? <CreateEvent /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-registrations"
            element={user ? <MyRegistrations /> : <Navigate to="/login" />}
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
