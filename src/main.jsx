import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import './index.css'
import CustomRouter from './components/CustomRouter';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomRouter/>
  </React.StrictMode>,
)
