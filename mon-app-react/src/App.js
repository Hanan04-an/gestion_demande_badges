import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container mt-4">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
