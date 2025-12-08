import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import ScrollToTop from "./components/ScrollTop/ScrollTop";
import { CatalogProvider } from "./context/CatalogProvider";
import { ToastProvider } from "./context/ToastContext";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { EffectProvider } from "./context/EffectContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleReCaptchaProvider
        reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        scriptProps={{
          async: false,
          defer: false,
          appendTo: "head",
          nonce: undefined,
        }}
      >
        <ToastProvider>
          <CatalogProvider>
            <ThemeProvider>
              <EffectProvider>
                <ScrollToTop />
                <App />
              </EffectProvider>
            </ThemeProvider>
          </CatalogProvider>
        </ToastProvider>
      </GoogleReCaptchaProvider>
    </BrowserRouter>
  </React.StrictMode>
);
