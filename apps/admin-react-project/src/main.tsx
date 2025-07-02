import React from 'react'
import ReactDOM from 'react-dom/client'
import 'antd/dist/reset.css';
import AppRouter from './routes'; 
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)