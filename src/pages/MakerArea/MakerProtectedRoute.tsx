import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase-config";
import { LoadingSpinner } from "../Catalog/components/Icons";

export const MakerProtectedRoute: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner className="w-12 h-12" />
      </div>
    );
  }

  if (error) {
    console.error("Erro de autenticação:", error);
    return <Navigate to="/maker/login" replace />;
  }

  return user ? <Outlet /> : <Navigate to="/maker/login" replace />;
};
