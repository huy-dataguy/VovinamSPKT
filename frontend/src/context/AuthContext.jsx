// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Login: lưu token & update state
  const loginUser = (token) => {
    localStorage.setItem('token', token);
    setCurrentUser({ token });
  };

  // Logout: xóa token & update state
  const logoutUser = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  // Khi app load, kiểm tra token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setCurrentUser({ token });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
