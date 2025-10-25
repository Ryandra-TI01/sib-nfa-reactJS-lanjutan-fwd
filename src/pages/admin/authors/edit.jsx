import { useEffect, useState } from "react";
import { getAuthorById, updateAuthor } from "../../../_services/authors";
import { useNavigate, useParams } from "react-router-dom";

export default function AuthorEdit() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const data = await getAuthorById(id);
        setName(data.name);
      } catch (err) {
        setError("Author not found");
      }
    };
    fetchAuthor();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return setError("Name cannot be empty");

    setLoading(true);
    try {
      await updateAuthor(id, { name });
      navigate("/admin/authors");
    } catch (err) {
      setError("Failed to update author");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-md px-4 py-8 mx-auto">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit Author</h2>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Author Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter author name"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {loading ? "Updating..." : "Update Author"}
          </button>
        </form>
      </div>
    </section>
  );
}
