import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import { UpdatePage } from './pages/SchwimmerUpdate';
import { AuswertungPage } from './pages/Auswertung';

function App() {
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  return (
    <BrowserRouter>
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
        <Route path="*" element={<Navigate to={isAuthenticated ? "/update" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;