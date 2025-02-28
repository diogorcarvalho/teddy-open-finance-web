import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "primereact/resources/themes/lara-light-blue/theme.css"; // Tema do PrimeReact
import "primereact/resources/primereact.min.css"; // Estilos básicos do PrimeReact
import "primeicons/primeicons.css"; // Ícones do PrimeIcons
import "primeflex/primeflex.css"; // Utilitários CSS do PrimeFlex
import "./index.css"; // Seu CSS global (opcional)
import { ConfirmDialog } from 'primereact/confirmdialog';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ConfirmDialog />
  </StrictMode>,
);