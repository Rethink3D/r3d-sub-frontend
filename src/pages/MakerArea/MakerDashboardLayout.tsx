import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoCubeOutline, IoGridOutline, IoDiamondOutline, IoLogOutOutline } from "react-icons/io5"; // Usando react-icons
import { useTheme } from "../../context/ThemeContext";

// Componente de Link da Sidebar
const SidebarLink: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => {
  const baseClasses = "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors";
  const activeClasses = "bg-blue-600 text-white";
  const inactiveClasses = "text-texto-secundario hover:bg-fundo-secundario hover:text-texto-principal";

  return (
    <NavLink
      to={to}
      end // Garante que o link 'Dashboard' não fique ativo em outras rotas
      className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export const MakerDashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const logoSrc = theme === "light" ? "/Full-name-2-thin black.png" : "/Full-name-2-thin 1.png";

  const handleLogout = () => {
    // No futuro, aqui também chamará o signOut() do Firebase
    localStorage.removeItem("makerAuthToken");
    navigate("/maker/login");
  };

  return (
    <div className="flex min-h-[calc(100vh-7rem)]"> {/* Desconta altura do Header */}
      {/* --- Sidebar (Menu Lateral) --- */}
      <aside className="w-64 bg-fundo-principal border-r border-borda p-4 hidden md:flex flex-col">
        <div className="flex-grow">
          <nav className="flex flex-col gap-2">
            <SidebarLink
              to="/maker/dashboard"
              icon={<IoGridOutline size={20} />}
              label="Dashboard"
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
        
        {/* --- Botão de Sair --- */}
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
        {/* O Outlet renderiza as rotas filhas (Dashboard, Produtos, etc.) */}
        <Outlet />
      </main>

      {/* TODO: Criar Navegação Mobile (Bottom Bar) aqui */}
    </div>
  );
};