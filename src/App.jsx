import { BrowserRouter, Route, Routes } from "react-router-dom";

import PublicLayout from "./layouts/public.jsx";
import Home from "./pages/public/index.jsx";
import Books from "./pages/public/books/index.jsx";
import Login from "./pages/auth/login.jsx";
import Register from "./pages/auth/register.jsx";
import AdminLayout from "./layouts/admin.jsx";
import Dashboard from "./pages/admin/index.jsx";
import AdminBooks from "./pages/admin/books/index.jsx";
import BookCreate from "./pages/admin/books/create.jsx";
import AdminGenres from "./pages/admin/genres/index.jsx";
import GenreCreate from "./pages/admin/genres/create.jsx";
import AdminAuthors from "./pages/admin/authors/index.jsx";
import AuthorCreate from "./pages/admin/authors/create.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route element={<PublicLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="books" element={<Books />} />
          </Route>

          {/* AUTH ROUTES */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* ADMIN ROUTES */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />

            <Route path="genres">
              <Route index element={<AdminGenres />} />
              <Route path="create" element={<GenreCreate />} />
            </Route>
            <Route path="authors">
              <Route index element={<AdminAuthors />} />
              <Route path="create" element={<AuthorCreate />} />
            </Route>

            <Route path="books">
              <Route index element={<AdminBooks />} />
              <Route path="create" element={<BookCreate />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
