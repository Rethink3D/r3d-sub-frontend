import { Navigate, Outlet } from "react-router-dom";

/**
 * Verifica se o token FALSO do maker existe no localStorage.
 * Se não existir, expulsa o usuário para a tela de login.
 */
export const MakerProtectedRoute: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("makerAuthToken");

  return isAuthenticated ? <Outlet /> : <Navigate to="/maker/login" replace />;
};