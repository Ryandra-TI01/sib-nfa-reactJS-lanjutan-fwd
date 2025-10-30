import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks, deleteBook } from "../../../_services/books";

export default function BookIndex() {
  const [books, setBooks] = useState([]);
  const fetchData = async () => {
    try {
      const res = await getBooks();
      setBooks(res.data);
      console.log(res);
      
    } catch (error) {
      console.error(error);
      alert("Failed to fetch books");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this books?")) return;
    try {
      await deleteBook(id);
      fetchData();
    } catch (error) {
      alert("Failed to delete books");
    }
  };

  return (
    <section className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Books
        </h2>
        <Link
          to="/admin/books/create"
          className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-medium"
        >
          + Add Book
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Genre</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book) => (
                <tr key={book.id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                    {book.title}
                  </td>
                  <td className="px-4 py-3">{book.price}</td>
                  <td className="px-4 py-3">{book.stock}</td>
                  <td className="px-4 py-3">{book.genre?.name}</td>
                  <td className="px-4 py-3">{book.author?.name}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Link
                      to={`/admin/books/edit/${book.id}`}
                      className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
