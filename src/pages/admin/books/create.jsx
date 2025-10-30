import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthors } from "../../../_services/authors";
import { getGenres } from "../../../_services/genres";
import { createBook } from "../../../_services/books";
import { handleApiError } from "../../../utils/handleApiError";

export default function BookCreate() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    genre_id: "",
    author_id: "",
    cover_photo: null,
  });

  // Load authors & genres
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genresData, authorsData] = await Promise.all([
          getGenres(),
          getAuthors(),
        ]);
        setGenres(genresData);
        setAuthors(authorsData);
      } catch (err) {
        setError("Failed to load genres or authors.");
      }
    };
    fetchData();
  }, []);

  // Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cover_photo" && files?.[0]) {
      setFormData((prev) => ({ ...prev, cover_photo: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        payload.append(key, value)
      );

      await createBook(payload);
      navigate("/admin/books");
    } catch (err) {
      // const message =
      //   err?.response?.data?.message ||
      //   err?.response?.data?.error ||
      //   Object.values(err?.response?.data?.errors || {})
      //     .flat()
      //     .join(", ") ||
      //   "Failed to create book. Please check your input.";
      // setError(message);
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 transition-colors duration-300">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
        📘 Add New Book
      </h2>

      {error && (
        <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
          {error.split(",").map((msg, i) => (
            <p key={i}>• {msg.trim()}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Cover */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cover Photo
          </label>
          <input
            type="file"
            name="cover_photo"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 h-40 object-cover rounded-lg border dark:border-gray-700"
            />
          )}
        </div>

        {/* Title */}
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Book Title"
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
          
        />

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows={3}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
          
        />

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
            
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
            
          />
        </div>

        {/* Genre & Author */}
        <div className="grid grid-cols-2 gap-4">
          <select
            name="genre_id"
            value={formData.genre_id}
            onChange={handleChange}
            className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
            
          >
            <option value="">-- Select Genre --</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>

          <select
            name="author_id"
            value={formData.author_id}
            onChange={handleChange}
            className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
            
          >
            <option value="">-- Select Author --</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => navigate("/admin/books")}
            className="px-5 py-2.5 rounded-lg bg-gray-400 hover:bg-gray-500 text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors disabled:opacity-70"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
}
