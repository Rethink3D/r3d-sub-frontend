import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Maker } from "./types/types";
import { useCatalogContext } from "./context/CatalogContext";
import { useProductModal } from "./hooks/useProductModal";
import { useMakerModal } from "./hooks/useMakerModal";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminLayout from "./pages/Admin/AdminLayout";
import ProtectedRoute from "./pages/Admin/ProtectedRoute";
import Dashboard from "./pages/Admin/Dashboard";
import Makers from "./pages/Admin/Makers";
import Products from "./pages/Admin/Products";
import MakerProducts from "./pages/Admin/MakerProducts";
import MakerForm from "./pages/Admin/components/MakerForm";
import ProductForm from "./pages/Admin/components/ProductForm";
import NotFound from "./pages/NotFound/NotFound";
import RequestPrintDrawer from "./pages/Catalog/components/RequestPrintDrawer";
import MakerProfileModal from "./pages/Catalog/components/MakerProfileModal/MakerProfileModal";
import Devolutions from "./pages/Admin/Devolutions";
import { MakerRegistration } from "./pages/MakerArea/register/MakerRegistration";
import { MakerLogin } from "./pages/MakerArea/login/MakerLogin";
import { MakerProtectedRoute } from "./pages/MakerArea/MakerProtectedRoute";
import { MakerProductList } from "./pages/MakerArea/dashboard/subcomponents/MakerProductList";
import { MakerProductForm } from "./pages/MakerArea/dashboard/subcomponents/MakerProductForm";
import { MakerDashboardLayout } from "./pages/MakerArea/dashboard/MakerDashboardLayout";
import { MakerProfileEdit } from "./pages/MakerArea/dashboard/subcomponents/MakerProfileEdit";
import Terms from "./pages/Terms/Terms";
import AccountDeletion from "./pages/AccountDeletion/AccountDeletion";
import { MakerForgotPassword } from "./pages/MakerArea/components/MakerForgotPassword";
import Maintenance from "./components/Maintenance/Maintenance";

const MakerDashboardContent = () => (
  <div className="bg-fundo-principal p-6 rounded-lg shadow-sm border border-borda">
    <h1 className="text-3xl font-bold text-texto-principal">Meu Dashboard</h1>
    <p className="text-texto-secundario mt-4">Bem-vindo à sua área, Maker!</p>
    <p className="text-texto-secundario mt-2">
      Navegue até produtos para gerenciar seus produtos.
    </p>
  </div>
);

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const IS_MAINTENANCE_MODE = true;
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (IS_MAINTENANCE_MODE && !isAdminRoute) {
    return <Maintenance />;
  }

  const { handleMakerSearch } = useCatalogContext();

  const {
    maker: productMaker,
    product,
    isLoading: isProductLoading,
    handleCloseModal: closeProductModal,
  } = useProductModal();

  const {
    maker: directMaker,
    isLoading: isMakerLoading,
    handleCloseModal: closeMakerModal,
  } = useMakerModal();

  const [isRequestPanelOpen, setIsRequestPanelOpen] = useState(false);

  const makerToShow = productMaker || directMaker;
  const isLoading = isProductLoading || isMakerLoading;
  const handleClose = productMaker ? closeProductModal : closeMakerModal;

  const handleMakerSelect = (makerFromDrawer: Maker) => {
    navigate(`/catalogo/maker/${makerFromDrawer.id}`);
    setIsRequestPanelOpen(false);
  };

  const handleViewAllFromModal = (makerName: string) => {
    handleMakerSearch(makerName);
    handleClose();
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isAdminRoute ? "bg-gray-100" : ""
      }`}
    >
      {!isAdminRoute && (
        <Header onOpenRequestDrawer={() => setIsRequestPanelOpen(true)} />
      )}

      <main
        className={
          !isAdminRoute
            ? "container mx-auto flex-1 px-4 md:px-8 pt-0"
            : "flex-1"
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/catalogo"
            element={
              <Catalog
                onOpenRequestDrawer={() => setIsRequestPanelOpen(true)}
              />
            }
          />
          <Route
            path="/catalogo/produto/:productId"
            element={
              <Catalog
                onOpenRequestDrawer={() => setIsRequestPanelOpen(true)}
              />
            }
          />
          <Route
            path="/catalogo/maker/:makerId"
            element={
              <Catalog
                onOpenRequestDrawer={() => setIsRequestPanelOpen(true)}
              />
            }
          />
          <Route path="/saiba-mais" element={<About />} />
          <Route path="/contato" element={<Contact />} />

          <Route path="/maker/register" element={<MakerRegistration />} />
          <Route path="/maker/login" element={<MakerLogin />} />
          <Route
            path="/maker/recuperar-senha"
            element={<MakerForgotPassword />}
          />
          <Route element={<MakerProtectedRoute />}>
            <Route element={<MakerDashboardLayout />}>
              <Route
                path="/maker/dashboard"
                element={<MakerDashboardContent />}
              />
              <Route path="/maker/perfil" element={<MakerProfileEdit />} />
              <Route path="/maker/produtos" element={<MakerProductList />} />
              <Route
                path="/maker/produtos/novo"
                element={<MakerProductForm />}
              />
              <Route
                path="/maker/produtos/editar/:id"
                element={<MakerProductForm />}
              />
            </Route>
          </Route>

          <Route path="/termos" element={<Terms />} />
          <Route path="/exclusao-de-conta" element={<AccountDeletion />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="makers" element={<Makers />} />
              <Route
                path="makers/:makerId/products"
                element={<MakerProducts />}
              />
              <Route path="makers/new" element={<MakerForm />} />
              <Route path="makers/edit/:id" element={<MakerForm />} />
              <Route path="products" element={<Products />} />
              <Route path="products/new" element={<ProductForm />} />
              <Route path="products/edit/:id" element={<ProductForm />} />
              <Route path="devolutions" element={<Devolutions />} />
            </Route>
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}

      <RequestPrintDrawer
        isOpen={isRequestPanelOpen}
        onClose={() => setIsRequestPanelOpen(false)}
        onMakerSelect={handleMakerSelect}
      />

      {makerToShow && (
        <MakerProfileModal
          maker={makerToShow}
          featuredProduct={product || undefined}
          onClose={handleClose}
          isLoading={isLoading}
          onViewAllProducts={handleViewAllFromModal}
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;
