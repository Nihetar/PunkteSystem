import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import { UpdatePage } from './pages/SchwimmerUpdate';
import { AuswertungPage } from './pages/Auswertung';
import { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(Boolean(token));
  }, []);

  if (isAuthenticated === null) {
    return null;
  }
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/update"
        element={
          isAuthenticated ? <UpdatePage /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/auswertung"
        element={
          isAuthenticated ? <AuswertungPage /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? '/update' : '/login'} replace />}
      />
    </Routes>
  );
}

export default App;
