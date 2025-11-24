import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import ScrollToTop from "./components/ScrollTop/ScrollTop";
import { CatalogProvider } from "./context/CatalogProvider";
import { ToastProvider } from "./context/ToastContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <CatalogProvider>
          <ThemeProvider>
            <ScrollToTop />
            <App />
          </ThemeProvider>
        </CatalogProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
