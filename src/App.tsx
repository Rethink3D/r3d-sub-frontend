import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
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

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const [isRequestPanelOpen, setIsRequestPanelOpen] = useState(false);

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isAdminRoute ? "bg-gray-100" : ""
      }`}
    >
      {!isAdminRoute && <Header onOpenRequestDrawer={() => setIsRequestPanelOpen(true)} />}

      <main
        className={
          !isAdminRoute ? "container mx-auto flex-1 p-4 md:p-8" : "flex-1"
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog onOpenRequestDrawer={() => setIsRequestPanelOpen(true)} />} />
          <Route path="/saiba-mais" element={<About />} />
          <Route path="/contato" element={<Contact />} />
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
            </Route>
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}

      <RequestPrintDrawer
        isOpen={isRequestPanelOpen}
        onClose={() => setIsRequestPanelOpen(false)}
      />
    </div>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;
