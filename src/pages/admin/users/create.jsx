import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../_services/users";

export default function UserCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await createUser(formData);
      navigate("/admin/users");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Failed to create user. Please check your input.";
      setError(message);
    }
  };

  return (
    <section className="p-4 sm:p-6 bg-white dark:bg-gray-900 shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Create User
      </h2>

      {error && (
        <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
          {error.split(",").map((msg, i) => (
            <p key={i}>• {msg.trim()}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm text-gray-900 dark:text-white">
            Name
          </label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-900 dark:text-white">
            Email
          </label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-900 dark:text-white">
            Password
          </label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-900 dark:text-white">
            Role
          </label>
          <select
            name="role"
            onChange={handleChange}
            value={formData.role}
            className="w-full p-2.5 border rounded-lg focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          Create User
        </button>
      </form>
    </section>
  );
}
