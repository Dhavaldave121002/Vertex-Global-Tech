import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Bootstrap CSS + JS (Popper included)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
