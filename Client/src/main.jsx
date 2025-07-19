import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importa Bootstrap Icons

createRoot(document.getElementById('root')).render(
  <StrictMode>    
      <App />    
  </StrictMode>,
)
