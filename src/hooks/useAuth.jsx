export default function useAuth() {
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));
  return { token, user, isAuthenticated: !!token };
}
