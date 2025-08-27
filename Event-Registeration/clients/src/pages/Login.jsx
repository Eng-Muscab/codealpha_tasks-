import { useState } from "react";
import { useUser } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import API from "../api/api.js";
import { useToast } from "../components/ToastProvider.jsx";

export default function AuthPage() {
  const { setUser } = useUser();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false); // toggle form
  const [username, setUsername] = useState("");
  const [full_name, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await API.post("/users/register", { username, full_name, password });
      showToast("Registered successfully! Please login.");
      setIsRegister(false); // switch to login after success
    } catch (err) {
      showToast(err.response?.data?.message || "Error registering");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await API.post("/users/login", { username, password });
      setUser(res.data);
      showToast("Login successful!");
      navigate("/");
    } catch (err) {
      showToast(err.response?.data?.message || "Error logging in");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg mt-20 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {isRegister ? "Register" : "Login"}
      </h1>

      {isRegister && (
        <input
          type="text"
          placeholder="Full Name"
          value={full_name}
          onChange={(e) => setFullName(e.target.value)}
          className="border rounded p-3 w-full mb-3 focus:outline-blue-500"
        />
      )}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border rounded p-3 w-full mb-3 focus:outline-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded p-3 w-full mb-6 focus:outline-blue-500"
      />

      <button
        onClick={isRegister ? handleRegister : handleLogin}
        className={`w-full px-4 py-2 rounded text-white mb-4 transition ${
          isRegister
            ? "bg-green-500 hover:bg-green-600"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isRegister ? "Register" : "Login"}
      </button>

      <p className="text-center text-gray-500">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          onClick={() => setIsRegister(!isRegister)}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          {isRegister ? "Login here" : "Register here"}
        </span>
      </p>
    </div>
  );
}
