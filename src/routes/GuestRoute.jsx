import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function GuestRoute() {
    const { token, user } = useAuth();

  // if authenticated → redirect to appropriate dashboard
  if (token && user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/"} replace />;
  }
  return <Outlet />;
}