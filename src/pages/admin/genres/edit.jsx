import { useEffect, useState } from "react";
import { getGenreById, updateGenre } from "../../../_services/genres";
import { useNavigate, useParams } from "react-router-dom";

export default function GenreEdit() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const data = await getGenreById(id);
        setName(data.name);
      } catch (err) {
        console.error(err);
        setError("Genre not found");
      }
    };
    fetchGenre();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return setError("Name cannot be empty");

    setLoading(true);
    try {
      await updateGenre(id, { name });
      navigate("/admin/genres");
    } catch (err) {
      console.error(err);
      setError("Failed to update genre");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-md px-4 py-8 mx-auto">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit Genre</h2>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Genre Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter genre name"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {loading ? "Updating..." : "Update Genre"}
          </button>
        </form>
      </div>
    </section>
  );
}
