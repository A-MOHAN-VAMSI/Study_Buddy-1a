import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getUser = () => {
    const data = localStorage.getItem("user");

    if (!data) return null;

    return JSON.parse(data);
  };

  return {
    login,
    logout,
    getUser,
  };
}