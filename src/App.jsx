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
import AuthorEdit from "./pages/admin/authors/edit.jsx";
import GenreEdit from "./pages/admin/genres/edit.jsx";
import ShowBook from "./pages/public/books/show.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import GuestRoute from "./routes/GuestRoute.jsx";
import AdminUsers from "./pages/admin/users/index.jsx";
import UserCreate from "./pages/admin/users/create.jsx";
import UserEdit from "./pages/admin/users/edit.jsx";
import BookEdit from "./pages/admin/books/edit.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route element={<PublicLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="books" element={<Books />} />
            <Route path="books/show/:id" element={<ShowBook />} />
          </Route>

          {/* AUTH ROUTES */}
          <Route element={<GuestRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* ADMIN ROUTES */}
          <Route
            path="admin"
            element={<ProtectedRoute allowedRoles={["admin"]} />}
          >
            <Route element={<AdminLayout />}>
              <Route index element={<Dashboard />} />

              {/* USERS ROUTES */}
              <Route path="users">
                <Route index element={<AdminUsers />} />
                <Route path="create" element={<UserCreate />} />
                <Route path="/admin/users/edit/:id" element={<UserEdit />} />
              </Route>

              {/* GENRES ROUTES */}
              <Route path="genres">
                <Route index element={<AdminGenres />} />
                <Route path="create" element={<GenreCreate />} />
                <Route path="/admin/genres/edit/:id" element={<GenreEdit />} />
              </Route>

              {/* AUTHORS ROUTES */}
              <Route path="authors">
                <Route index element={<AdminAuthors />} />
                <Route path="create" element={<AuthorCreate />} />
                <Route
                  path="/admin/authors/edit/:id"
                  element={<AuthorEdit />}
                />
              </Route>

              {/* BOOKS ROUTES */}
              <Route path="books">
                <Route index element={<AdminBooks />} />
                <Route path="create" element={<BookCreate />} />
                <Route path="/admin/books/edit/:id" element={<BookEdit />} />
              </Route>

            </Route>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
