// Importa hooks do React
import { useEffect, useState } from 'react';

// Importa função do Firebase para monitorar mudanças no estado de autenticação
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

// Importa o componente de redirecionamento do React Router
import { Navigate } from 'react-router-dom';

// Componente que protege rotas privadas, redirecionando para o login se o usuário não estiver autenticado
export default function ProtectedRoute({ children }) {
  // Estado para armazenar o usuário autenticado
  const [user, setUser] = useState(null);

  // Estado de carregamento, para não renderizar antes de saber se há usuário logado
  const [loading, setLoading] = useState(true);

  // useEffect para escutar mudanças na autenticação
  useEffect(() => {
    // Inicia o listener do Firebase para mudanças no auth state
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u); // Atualiza o estado do usuário
      setLoading(false); // Finaliza o carregamento
    });

    // Limpa o listener quando o componente for desmontado
    return () => unsub();
  }, []);

  // Se ainda está carregando, exibe uma mensagem simples
  if (loading) return <p>Carregando...</p>;

  // Se não houver usuário autenticado, redireciona para a página de login
  if (!user) return <Navigate to="/login" />;

  // Se o usuário está autenticado, renderiza os filhos (children) da rota protegida
  return children;
}
