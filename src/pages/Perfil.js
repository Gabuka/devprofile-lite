// Importa hooks do React, autenticação e Firestore do Firebase, e navegação do React Router
import { useEffect, useState } from "react";
import { auth, db } from "../firebase"; // auth: autenticação, db: banco de dados Firestore
import { doc, getDoc } from "firebase/firestore"; // Funções para buscar documentos no Firestore
import { useNavigate } from "react-router-dom"; // Hook para redirecionar o usuário

export default function Perfil() {
  const [perfil, setPerfil] = useState(null); // Armazena os dados do perfil do usuário
  const [erro, setErro] = useState("");       // Armazena mensagens de erro, se houver
  const navigate = useNavigate();             // Permite navegação entre rotas

  const user = auth.currentUser;              // Recupera o usuário autenticado atual

  // useEffect executa assim que o componente monta ou quando o `user` muda
  useEffect(() => {
    async function fetchPerfil() {
      if (user) {
        try {
          // Referência ao documento do perfil do usuário no Firestore
          const docRef = doc(db, "userProfiles", user.uid);
          const docSnap = await getDoc(docRef); // Busca os dados no Firestore

          if (docSnap.exists()) {
            // Se o documento existe, atualiza o estado com os dados do perfil
            setPerfil(docSnap.data());
          } else {
            // Se o documento não existe, exibe erro
            setErro("Perfil ainda não configurado.");
          }
        } catch (error) {
          // Em caso de erro na leitura do Firestore, exibe mensagem
          setErro("Erro ao buscar perfil: " + error.message);
        }
      }
    }

    fetchPerfil(); // Chama a função para buscar os dados
  }, [user]);

  // Função para deslogar o usuário e redirecionar para tela de login
  const handleLogout = () => {
    auth.signOut();       // Encerra a sessão do usuário
    navigate("/login");   // Redireciona para a tela de login
  };

  return (
    // Container principal com padding e cor de fundo
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Caixa central com fundo branco e sombra */}
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Cabeçalho com título e botão de sair */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Meu Perfil</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:underline"
          >
            Sair
          </button>
        </div>

        {/* Exibe erro, se houver */}
        {erro && <p className="text-red-600">{erro}</p>}

        {/* Se os dados do perfil estiverem disponíveis, exibe conteúdo */}
        {perfil ? (
          <div>
            <p className="mb-2">
              <strong>Nome:</strong> {perfil.nomeCompleto}
            </p>
            <p className="mb-2">
              <strong>Bio:</strong> {perfil.bioCurta}
            </p>
            <p>
              <strong>Portfólio:</strong>{" "}
              <a
                href={perfil.linkPortfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {perfil.linkPortfolio}
              </a>
            </p>
          </div>
        ) : (
          // Enquanto os dados não chegam, exibe mensagem de carregamento
          <p className="text-gray-600">Carregando informações...</p>
        )}
      </div>
    </div>
  );
}
