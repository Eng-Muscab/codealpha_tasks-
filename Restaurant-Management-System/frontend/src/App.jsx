import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Menu from "./pages/Menu.jsx";
import Orders from "./pages/Orders.jsx";
import Tables from "./pages/Tables.jsx";
import Reservations from "./pages/Reservations.jsx";
import Inventory from "./pages/Inventory.jsx";
import SidebarLayout from "./components/Sidebar.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SidebarLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="menu" element={<Menu />} />
          <Route path="orders" element={<Orders />} />
          <Route path="tables" element={<Tables />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="inventory" element={<Inventory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
