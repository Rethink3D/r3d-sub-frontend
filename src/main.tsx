import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; 
import { ThemeProvider } from './context/ThemeContext';
import ScrollToTop from './components/ScrollTop/ScrollTop';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ScrollToTop/>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)