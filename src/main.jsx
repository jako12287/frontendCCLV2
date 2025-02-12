import React from 'react'
import { StrictMode } from 'react'
import './styles/GlobalStyles.css'
import App from './App.jsx'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)