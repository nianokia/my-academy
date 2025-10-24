import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

// --- AuthProvider wraps the app and provides auth state ---
export const AuthProvider = ({ children }) => {
  // --- Set global auth state ---
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // --- Load user & token from localStorage when app mounts ---
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    user ? localStorage.setItem("user", JSON.stringify(user)) : localStorage.removeItem("user");
    token ? localStorage.setItem("token", token) : localStorage.removeItem("token");
  }, [user, token]);

  // ------- LOGIN FUNCTION: sets user & token -------
  const login = (userData, jwtToken) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
    setUser(userData);
    setToken(jwtToken);
  };
  
  // ------- LOGOUT FUNCTION: clears user & token -------
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, loading, setLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;