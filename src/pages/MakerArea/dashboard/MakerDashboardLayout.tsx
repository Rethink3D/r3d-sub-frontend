import { Outlet } from "react-router-dom";
import {
  IoCubeOutline,
  IoGridOutline,
  IoLogOutOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { LoadingSpinner } from "../../Catalog/components/Icons";
import { useMakerProfile } from "../../../hooks/useMakerProfle";
import { MobileNavLink, SidebarLink } from "./subcomponents/NavLinks";

export const MakerDashboardLayout: React.FC = () => {
  const { maker, loading, error, handleLogout } = useMakerProfile();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner className="w-12 h-12" />
        <p className="ml-4 text-texto-secundario">Carregando seu perfil...</p>
      </div>
    );
  }

  if (error || !maker) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-4">
        <h2 className="text-2xl font-bold text-red-500">
          Erro ao Carregar Perfil
        </h2>
        <p className="text-texto-secundario mt-2">
          {error || "Perfil não encontrado."}
        </p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Tentar Login Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-7rem)] pb-16 md:pb-0">
      {/* --- SIDEBAR (Desktop) --- */}
      <aside className="w-64 bg-fundo-principal border-r border-borda p-4 hidden md:flex flex-col sticky top-0 h-[calc(100vh-7rem)]">
        <div className="flex-grow">
          <nav className="flex flex-col gap-2">
            <SidebarLink
              to="/maker/dashboard"
              icon={<IoGridOutline size={20} />}
              label="Dashboard"
            />
            <SidebarLink
              to="/maker/perfil"
              icon={<IoPersonOutline size={20} />}
              label="Meu Perfil"
            />
            <SidebarLink
              to="/maker/produtos"
              icon={<IoCubeOutline size={20} />}
              label="Meus Produtos"
            />
          </nav>
        </div>
        <div className="mt-auto pt-4 border-t border-borda">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <IoLogOutOutline size={22} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="flex-1 p-4 md:p-8 bg-fundo-secundario overflow-y-auto">
        <Outlet context={maker} />
      </main>

      {/* --- NAVBAR (Mobile) --- */}
      <footer className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-fundo-principal border-t border-borda shadow-lg z-50">
        <nav className="grid grid-cols-4 h-full">
          <MobileNavLink
            to="/maker/dashboard"
            icon={<IoGridOutline size={22} />}
            label="Dashboard"
          />
          <MobileNavLink
            to="/maker/perfil"
            icon={<IoPersonOutline size={22} />}
            label="Perfil"
          />
          <MobileNavLink
            to="/maker/produtos"
            icon={<IoCubeOutline size={22} />}
            label="Produtos"
          />
          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center gap-1 w-full h-full text-texto-secundario active:text-red-500 transition-colors"
          >
            <IoLogOutOutline size={22} />
            <span className="text-xs font-medium">Sair</span>
          </button>
        </nav>
      </footer>
    </div>
  );
};