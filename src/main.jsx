import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import CustomRouter from './components/CustomRouter';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomRouter/>
  </React.StrictMode>,
)
