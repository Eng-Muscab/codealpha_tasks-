import { useState, useEffect } from "react";
import api from "../api/api.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  const fetchStats = async () => {
    try {
      const ordersRes = await api.get("/orders");
      setOrders(ordersRes.data);

      const reservationsRes = await api.get("/reservations");
      setReservations(reservationsRes.data);

      const inventoryRes = await api.get("/inventory");
      setLowStock(inventoryRes.data.filter((i) => i.quantity < 5));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 10000); // refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Orders per day chart
  const ordersByDay = orders.reduce((acc, o) => {
    const day = new Date(o.createdAt).toLocaleDateString();
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.keys(ordersByDay).map((day) => ({
    day,
    orders: ordersByDay[day],
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="p-4 bg-blue-500 text-white rounded shadow">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl mt-2">{orders.length}</p>
        </div>

        <div className="p-4 bg-green-500 text-white rounded shadow">
          <h2 className="text-xl font-semibold">Total Sales ($)</h2>
          <p className="text-2xl mt-2">
            {orders.reduce((sum, o) => sum + o.price * o.quantity, 0)}
          </p>
        </div>

        <div className="p-4 bg-yellow-500 text-white rounded shadow">
          <h2 className="text-xl font-semibold">Reservations</h2>
          <p className="text-2xl mt-2">{reservations.length}</p>
        </div>

        <div className="p-4 bg-red-500 text-white rounded shadow">
          <h2 className="text-xl font-semibold">Low Stock Items</h2>
          <p className="text-2xl mt-2">{lowStock.length}</p>
          <ul className="mt-2 text-sm">
            {lowStock.map((i) => (
              <li key={i._id}>
                {i.name}: {i.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 bg-white rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Orders per Day</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
