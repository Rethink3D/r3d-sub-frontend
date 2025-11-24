import { NavLink } from "react-router-dom";

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export const SidebarLink: React.FC<NavLinkProps> = ({ to, icon, label }) => {
  const baseClasses =
    "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors";
  const activeClasses = "bg-blue-600 text-white";
  const inactiveClasses =
    "text-texto-secundario hover:bg-fundo-secundario hover:text-texto-principal";

  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export const MobileNavLink: React.FC<NavLinkProps> = ({ to, icon, label }) => {
  const baseClasses =
    "flex flex-col items-center justify-center gap-1 w-full h-full transition-colors";
  const activeClasses = "text-blue-500";
  const inactiveClasses = "text-texto-secundario hover:text-texto-principal";

  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
      }
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </NavLink>
  );
};
