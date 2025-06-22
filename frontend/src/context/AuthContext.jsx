import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null); // 'admin' ou 'funcionario'

  useEffect(() => {
    const tokenSalvo = localStorage.getItem("token");
    const tipoSalvo = localStorage.getItem("tipoUsuario");
    if (tokenSalvo) {
      setToken(tokenSalvo);
      setTipoUsuario(tipoSalvo);
    }
  }, []);

  const login = (token, tipo) => {
    localStorage.setItem("token", token);
    localStorage.setItem("tipoUsuario", tipo);
    setToken(token);
    setTipoUsuario(tipo);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tipoUsuario");
    setToken(null);
    setTipoUsuario(null);
  };

  const autenticado = !!token;

  return (
    <AuthContext.Provider value={{ token, tipoUsuario, autenticado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
