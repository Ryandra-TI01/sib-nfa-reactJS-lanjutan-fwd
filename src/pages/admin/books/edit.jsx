import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById, updateBook } from "../../../_services/books";
import { getGenres } from "../../../_services/genres";
import { getAuthors } from "../../../_services/authors";
import { handleApiError } from "../../../utils/handleApiError";

export default function BookEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    genre_id: "",
    author_id: "",
  });
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch data awal
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookRes, authorsRes, genresRes] = await Promise.all([
          getBookById(id),
          getAuthors(),
          getGenres(),
        ]);

        // ambil data book dengan fallback ke data.data
        const book = bookRes?.data?.data || bookRes?.data || bookRes;

        setFormData({
          title: book.title || "",
          description: book.description || "",
          price: book.price || "",
          stock: book.stock || "",
          genre_id: book.genre.id || "",
          author_id: book.author.id || "",
        });
        setAuthors(authorsRes?.data || authorsRes);
        setGenres(genresRes?.data || genresRes);
      } catch (err) {
        setError("Failed to load book data.");
      }
    };
    fetchData();
  }, [id]);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await updateBook(id, formData);
      // navigate("/admin/books");
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Edit Book
      </h2>

      {error && (
        <p className="text-red-600 mb-4 bg-red-50 dark:bg-red-800 dark:text-red-200 p-2 rounded-lg text-sm">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="dark:text-white block mb-1 text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            
          />
        </div>

        <div>
          <label className="dark:text-white block mb-1 text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="dark:text-white block mb-1 text-sm font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="dark:text-white block mb-1 text-sm font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="dark:text-white block mb-1 text-sm font-medium">Genre</label>
          <select
            name="genre_id"
            value={formData.genre_id}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          >
            <option value="">-- Select Genre --</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="dark:text-white block mb-1 text-sm font-medium">Author</label>
          <select
            name="author_id"
            value={formData.author_id}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          >
            <option value="">-- Select Author --</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/books")}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
}
