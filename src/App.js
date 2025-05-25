// Importações do React Router para roteamento SPA (Single Page Application)
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importação das páginas da aplicação
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Perfil from './pages/Perfil';

// Componente que protege rotas que exigem autenticação
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    // Envolve toda a aplicação com o roteador do React Router
    <Router>
      <Routes>
        {/* Rota para página de cadastro */}
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rota para página de login */}
        <Route path="/login" element={<Login />} />

        {/* Rota protegida: só permite acesso se o usuário estiver autenticado */}
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />

        {/* Redireciona qualquer rota inválida para /login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
