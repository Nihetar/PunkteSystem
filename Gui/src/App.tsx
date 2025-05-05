import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import ImportPage from './pages/ImportPage';
import { Auswertung } from './pages/Auswertung';
import { UpdatePage } from './pages/UpdatePage';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/update" element={<UpdatePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/import" element={<ImportPage />} />
        <Route path="/auswertung" element={<Auswertung />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  );
};

export default App;
