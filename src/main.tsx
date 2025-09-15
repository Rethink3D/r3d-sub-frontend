import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import ScrollToTop from "./components/ScrollTop/ScrollTop";
import { CatalogProvider } from "./context/CatalogProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CatalogProvider>
        <ThemeProvider>
          <ScrollToTop />
          <App />
        </ThemeProvider>
      </CatalogProvider>
    </BrowserRouter>
  </React.StrictMode>
);
