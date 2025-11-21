import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoCubeOutline, IoGridOutline, IoDiamondOutline, IoLogOutOutline, IoPersonOutline } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useEffect, useState } from 'react';
import { getMyMakerProfile } from '../../services/api';
import { Maker } from '../../types/types';
import { LoadingSpinner } from '../Catalog/components/Icons';

const SidebarLink: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => {
  const baseClasses = "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors";
  const activeClasses = "bg-blue-600 text-white";
  const inactiveClasses = "text-texto-secundario hover:bg-fundo-secundario hover:text-texto-principal";
  

  return (
    <NavLink
      to={to}
      end 
      className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

const MobileNavLink: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => {
  const baseClasses = "flex flex-col items-center justify-center gap-1 w-full h-full transition-colors";
  const activeClasses = "text-blue-500";
  const inactiveClasses = "text-texto-secundario hover:text-texto-principal";
  
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </NavLink>
  );
};

export const MakerDashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const logoSrc = theme === "light" ? "/Full-name-2-thin black.png" : "/Full-name-2-thin 1.png";
  const [maker, setMaker] = useState<Maker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMakerProfile = async () => {
      try {
        setLoading(true);
        const makerProfile = await getMyMakerProfile();
        setMaker(makerProfile);
      } catch (err: any) {
        console.error("Erro ao buscar perfil do maker:", err);
        setError("Não foi possível carregar seu perfil de maker.");
      } finally {
        setLoading(false);
      }
    };

    fetchMakerProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("makerAuthToken");
      navigate("/maker/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      localStorage.removeItem("makerAuthToken");
      navigate("/maker/login");
    }
  };

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
        <h2 className="text-2xl font-bold text-red-500">Erro ao Carregar Perfil</h2>
        <p className="text-texto-secundario mt-2">{error || "Perfil não encontrado."}</p>
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
      
      {/* --- Sidebar (Desktop) --- */}
      <aside className="w-64 bg-fundo-principal border-r border-borda p-4 hidden md:flex flex-col"> {/*  */}
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
            <SidebarLink
              to="/maker/assinatura"
              icon={<IoDiamondOutline size={20} />}
              label="Assinatura"
            />
          </nav>
        </div>
        
        {/* --- Botão de Sair (Desktop) --- */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <IoLogOutOutline size={22} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* --- Área de Conteúdo Principal --- */}
      <main className="flex-1 p-4 md:p-8 bg-fundo-secundario overflow-y-auto">
        <Outlet context={maker} />
      </main>

      {/* --- 👇 NOVA BARRA DE NAVEGAÇÃO (Mobile) --- */}
      <footer className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-fundo-principal border-t border-borda shadow-lg z-50">
        <nav className="grid grid-cols-5 h-full">
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
          <MobileNavLink
            to="/maker/assinatura"
            icon={<IoDiamondOutline size={22} />}
            label="Assinatura"
          />
          {/* Botão de Sair (Mobile) */}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center gap-1 w-full h-full text-texto-secundario"
          >
            <IoLogOutOutline size={22} />
            <span className="text-xs font-medium">Sair</span>
          </button>
        </nav>
      </footer>
    </div>
  );
};