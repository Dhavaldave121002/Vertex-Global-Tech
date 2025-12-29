import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
// Bootstrap CSS + JS (Popper included)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'

import './styles/bootstrap-harmonize.css'
import './index.css' // Load Tailwind last to override Bootstrap

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)